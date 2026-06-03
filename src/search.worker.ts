import { runSearchProofDirect } from './lennma-bridge-internal';

self.onmessage = async (e: MessageEvent) => {
  const { assumptions, target } = e.data;
  try {
    const result = await runSearchProofDirect(assumptions, target, (step) => {
      self.postMessage({ type: 'step', step });
    });
    self.postMessage({ type: 'result', result });
  } catch (error: any) {
    self.postMessage({
      type: 'result',
      result: {
        success: false,
        steps: [],
        proofSteps: [],
        error: error?.toString() || "Unknown worker search error."
      }
    });
  }
};
