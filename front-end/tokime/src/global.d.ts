declare global {
  interface Window {
    naver: any;
    daum: {
      Postcode: any; // Adjust the type as necessary based on what `Postcode` is expected to be
    };
  }
}

export {};
