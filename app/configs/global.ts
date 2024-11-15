export const globalVar = {
  AXIOS_TIMEOUT: Number(process.env.NEXT_PUBLIC_AXIOS_TIMEOUT) || 5000, // 5 seconds
  SSE_TIMEOUT: Number(process.env.NEXT_PUBLIC_SSE_TIMEOUT) || 5000, // 5 seconds
  SSE_HEARTBEAT_TIMEOUT:
    Number(process.env.NEXT_PUBLIC_SSE_HEARTBEAT_TIMEOUT) || 120_000, // 120 seconds
  SSE_HEARTBEAT_INTERVAL:
    Number(process.env.NEXT_PUBLIC_SSE_HEARTBEAT_INTERVAL) || 15_000, // 15 seconds
}
