export default function pause(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}