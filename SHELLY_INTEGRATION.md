# Shelly Device Integration Guide

This platform currently uses a mock data layer (`src/context/ShellyContext.jsx`) for demonstration purposes. To connect real Shelly devices, you need to replace the mock state with real API calls.

## Prerequisites

1.  **Shelly Devices**: Ensure your devices (Gen2/Gen3) are on the same local network or reachable via VPN/Cloud.
2.  **CORS**: If running the frontend directly from a browser against local IP addresses, you might encounter CORS issues. It is recommended to use a lightweight backend proxy (Node.js/Express) or configure your Shelly devices to allow CORS if supported (Gen3 supports some CORS settings).

## Integration Strategy

### 1. Connecting to Shelly Pro 3EM (Energy Meter)

The Shelly Pro 3EM provides real-time data via the `/rpc/EM.GetStatus` or simple `/rpc/Shelly.GetStatus` endpoints.

**Example Implementation:**

Modify `src/context/ShellyContext.jsx`:

```javascript
// ...
const fetchShellyStatus = async (ip) => {
  try {
    const response = await fetch(`http://${ip}/rpc/Shelly.GetStatus`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch status:", error);
    return null;
  }
};

// In your useEffect loop:
useEffect(() => {
    const interval = setInterval(async () => {
        const status = await fetchShellyStatus('192.168.1.101'); // Your Device IP
        if (status) {
            // Mapping Logic depends on specific device structure
            // Example for Pro 3EM:
            const totalPower = status['em:0'].total_act_power;

            setSystemStatus(prev => ({
                ...prev,
                pvPower: totalPower / 1000, // Convert W to kW
                // ... map other fields
            }));
        }
    }, 2000);
    return () => clearInterval(interval);
}, []);
```

### 2. Controlling Relays (Shelly Plus 1PM)

To turn a relay on/off (e.g., in `Scripts.jsx` logic):

```javascript
const toggleRelay = async (ip, id, turnOn) => {
    // Shelly Gen2/3 RPC
    const method = 'Switch.Set';
    const params = { id: 0, on: turnOn };

    await fetch(`http://${ip}/rpc/${method}`, {
        method: 'POST',
        body: JSON.stringify({ id: 1, method, params })
    });
};
```

### 3. WebSockets for Real-time Events

For lower latency, especially for the "Live Console" in Scripts, use Shelly's WebSocket endpoint:

```javascript
const ws = new WebSocket('ws://192.168.1.101/rpc');
ws.onopen = () => {
    ws.send(JSON.stringify({
        id: 1,
        src: "dashboard",
        method: "Shelly.GetStatus"
    }));
};
ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    // Update state based on msg.result
};
```

## Recommended Architecture

For a production deployment, it is better to have a small backend service (Node.js, Python, or Go) that:
1.  Polls the Shelly devices.
2.  Stores history in a database (InfluxDB or SQLite).
3.  Exposes a unified GraphQL or REST API to this frontend.

This avoids CORS issues and reduces load on the Shelly devices.
