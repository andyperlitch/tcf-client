/**
 * Mock Amplitude for local development
 */

export const init = () => {
  console.log("mockAmplitude.init");
};

export const track = (eventInput: any, eventProperties: any) => {
  console.log("mockAmplitude.track", eventInput, eventProperties);
};
