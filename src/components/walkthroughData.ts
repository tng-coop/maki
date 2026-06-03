// Automatically generated from logic engine trace logs.
export interface DetailedStep {
  stepNum: number;
  poppedRaw: string;
  poppedDisplay: string;
  queueSize: number;
  derivedRaw: string;
  derivedDisplay: string;
}

export const TRANSITIVITY_STEPS: DetailedStep[] = [
  {
    "stepNum": 1,
    "poppedRaw": "(.TO .L_.A .L_.B)",
    "poppedDisplay": "(A → B)",
    "queueSize": 290,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 2,
    "poppedRaw": "(.TO .L_.B .L_.C)",
    "poppedDisplay": "(B → C)",
    "queueSize": 289,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 3,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → ((A → C) → (A → C)))",
    "queueSize": 288,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 4,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → ((A → C) → (A → C))) → (((A → C) → (A → C)) → ((A → C) → (A → C))))",
    "queueSize": 287,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → (A → C)) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 5,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → (A → C)) → ((A → C) → (A → C)))",
    "queueSize": 287,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 6,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.C)) (.NEG (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((¬(A → C) → ¬(A → C)) → ((A → C) → (A → C)))",
    "queueSize": 286,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 7,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → ((A → B) → (A → C)))",
    "queueSize": 285,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 8,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → ((A → C) → (A → B)))",
    "queueSize": 284,
    "derivedRaw": "((.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((A → C) → (A → B)))"
  },
  {
    "stepNum": 9,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))",
    "poppedDisplay": "((A → C) → (A → B))",
    "queueSize": 284,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 10,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → ((A → B) → (A → B)))",
    "queueSize": 283,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((A → B) → (A → B)))"
  },
  {
    "stepNum": 11,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))",
    "poppedDisplay": "((A → B) → (A → B))",
    "queueSize": 283,
    "derivedRaw": "((.TO .L_.A .L_.B)) ",
    "derivedDisplay": "((A → B))"
  },
  {
    "stepNum": 12,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → ((A → C) → (A → B))) → (((A → C) → (A → C)) → ((A → C) → (A → B))))",
    "queueSize": 282,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 13,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → ((A → B) → (A → C))) → (((A → C) → (A → B)) → ((A → C) → (A → C))))",
    "queueSize": 281,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → (A → B)) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 14,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → (A → B)) → ((A → C) → (A → C)))",
    "queueSize": 281,
    "derivedRaw": "((.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) ",
    "derivedDisplay": "(((A → C) → (A → C)))"
  },
  {
    "stepNum": 15,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))",
    "poppedDisplay": "((A → C) → (A → C))",
    "queueSize": 281,
    "derivedRaw": "((.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) ",
    "derivedDisplay": "(((A → C) → (A → C)))"
  },
  {
    "stepNum": 16,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → ((A → B) → (A → B))) → (((A → C) → (A → B)) → ((A → C) → (A → B))))",
    "queueSize": 280,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 17,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → ((A → C) → (A → C))) → (((A → B) → (A → C)) → ((A → B) → (A → C))))",
    "queueSize": 279,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 18,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → ((A → C) → (A → B))) → (((A → B) → (A → C)) → ((A → B) → (A → B))))",
    "queueSize": 278,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → (A → C)) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 19,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → (A → C)) → ((A → B) → (A → B)))",
    "queueSize": 278,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 20,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → ((A → B) → (A → C))) → (((A → B) → (A → B)) → ((A → B) → (A → C))))",
    "queueSize": 277,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 21,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → ((A → B) → (A → B))) → (((A → B) → (A → B)) → ((A → B) → (A → B))))",
    "queueSize": 276,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → (A → B)) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 22,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → (A → B)) → ((A → B) → (A → B)))",
    "queueSize": 276,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((A → B) → (A → B)))"
  },
  {
    "stepNum": 23,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.B)) (.NEG (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((¬(A → B) → ¬(A → C)) → ((A → C) → (A → B)))",
    "queueSize": 275,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 24,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.C)) (.NEG (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((¬(A → C) → ¬(A → B)) → ((A → B) → (A → C)))",
    "queueSize": 274,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 25,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.B)) (.NEG (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((¬(A → B) → ¬(A → B)) → ((A → B) → (A → B)))",
    "queueSize": 273,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 26,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.A (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → (A → (A → C)))",
    "queueSize": 272,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 27,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → (A → (A → B)))",
    "queueSize": 271,
    "derivedRaw": "((.TO .L_.A (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "((A → (A → B)))"
  },
  {
    "stepNum": 28,
    "poppedRaw": "(.TO .L_.A (.TO .L_.A .L_.B))",
    "poppedDisplay": "(A → (A → B))",
    "queueSize": 271,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 29,
    "poppedRaw": "(.TO .L_.A (.TO (.TO .L_.A .L_.C) .L_.A))",
    "poppedDisplay": "(A → ((A → C) → A))",
    "queueSize": 270,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 30,
    "poppedRaw": "(.TO .L_.A (.TO (.TO .L_.A .L_.B) .L_.A))",
    "poppedDisplay": "(A → ((A → B) → A))",
    "queueSize": 269,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 31,
    "poppedRaw": "(.TO .L_.A (.TO .L_.A .L_.A))",
    "poppedDisplay": "(A → (A → A))",
    "queueSize": 268,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 32,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → ((A → C) → A)) → (((A → C) → (A → C)) → ((A → C) → A)))",
    "queueSize": 267,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 33,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → ((A → B) → A)) → (((A → C) → (A → B)) → ((A → C) → A)))",
    "queueSize": 266,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 34,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → (A → (A → C))) → (((A → C) → A) → ((A → C) → (A → C))))",
    "queueSize": 265,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → A) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 35,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → A) → ((A → C) → (A → C)))",
    "queueSize": 265,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 36,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → (A → (A → B))) → (((A → C) → A) → ((A → C) → (A → B))))",
    "queueSize": 264,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 37,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → (A → A)) → (((A → C) → A) → ((A → C) → A)))",
    "queueSize": 263,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 38,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → ((A → C) → A)) → (((A → B) → (A → C)) → ((A → B) → A)))",
    "queueSize": 262,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 39,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → ((A → B) → A)) → (((A → B) → (A → B)) → ((A → B) → A)))",
    "queueSize": 261,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 40,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → (A → (A → C))) → (((A → B) → A) → ((A → B) → (A → C))))",
    "queueSize": 260,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 41,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → (A → (A → B))) → (((A → B) → A) → ((A → B) → (A → B))))",
    "queueSize": 259,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → A) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 42,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → A) → ((A → B) → (A → B)))",
    "queueSize": 259,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 43,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → (A → A)) → (((A → B) → A) → ((A → B) → A)))",
    "queueSize": 258,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 44,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((A → ((A → C) → (A → C))) → ((A → (A → C)) → (A → (A → C))))",
    "queueSize": 257,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 45,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((A → ((A → C) → (A → B))) → ((A → (A → C)) → (A → (A → B))))",
    "queueSize": 256,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 46,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) .L_.A)) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.A)))",
    "poppedDisplay": "((A → ((A → C) → A)) → ((A → (A → C)) → (A → A)))",
    "queueSize": 255,
    "derivedRaw": "((.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.A))) ",
    "derivedDisplay": "(((A → (A → C)) → (A → A)))"
  },
  {
    "stepNum": 47,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((A → (A → C)) → (A → A))",
    "queueSize": 255,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 48,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((A → ((A → B) → (A → C))) → ((A → (A → B)) → (A → (A → C))))",
    "queueSize": 254,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 49,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((A → ((A → B) → (A → B))) → ((A → (A → B)) → (A → (A → B))))",
    "queueSize": 253,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 50,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A .L_.A)))",
    "poppedDisplay": "((A → ((A → B) → A)) → ((A → (A → B)) → (A → A)))",
    "queueSize": 252,
    "derivedRaw": "((.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A .L_.A))) ",
    "derivedDisplay": "(((A → (A → B)) → (A → A)))"
  },
  {
    "stepNum": 51,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((A → (A → B)) → (A → A))",
    "queueSize": 252,
    "derivedRaw": "((.TO .L_.A .L_.A)) ",
    "derivedDisplay": "((A → A))"
  },
  {
    "stepNum": 52,
    "poppedRaw": "(.TO .L_.A .L_.A)",
    "poppedDisplay": "(A → A)",
    "queueSize": 252,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 53,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.A) (.TO .L_.A (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((A → (A → (A → C))) → ((A → A) → (A → (A → C))))",
    "queueSize": 251,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 54,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.A) (.TO .L_.A (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((A → (A → (A → B))) → ((A → A) → (A → (A → B))))",
    "queueSize": 250,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 55,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A .L_.A)) (.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.A)))",
    "poppedDisplay": "((A → (A → A)) → ((A → A) → (A → A)))",
    "queueSize": 249,
    "derivedRaw": "((.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.A))) ",
    "derivedDisplay": "(((A → A) → (A → A)))"
  },
  {
    "stepNum": 56,
    "poppedRaw": "(.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((A → A) → (A → A))",
    "queueSize": 249,
    "derivedRaw": "((.TO .L_.A .L_.A)) ",
    "derivedDisplay": "((A → A))"
  },
  {
    "stepNum": 57,
    "poppedRaw": "(.TO (.TO (.NEG .L_.A) (.NEG (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.C) .L_.A))",
    "poppedDisplay": "((¬A → ¬(A → C)) → ((A → C) → A))",
    "queueSize": 248,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 58,
    "poppedRaw": "(.TO (.TO (.NEG .L_.A) (.NEG (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) .L_.A))",
    "poppedDisplay": "((¬A → ¬(A → B)) → ((A → B) → A))",
    "queueSize": 247,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 59,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.C)) (.NEG .L_.A)) (.TO .L_.A (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((¬(A → C) → ¬A) → (A → (A → C)))",
    "queueSize": 246,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 60,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.B)) (.NEG .L_.A)) (.TO .L_.A (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((¬(A → B) → ¬A) → (A → (A → B)))",
    "queueSize": 245,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 61,
    "poppedRaw": "(.TO (.TO (.NEG .L_.A) (.NEG .L_.A)) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((¬A → ¬A) → (A → A))",
    "queueSize": 244,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 62,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → ((B → C) → (A → C)))",
    "queueSize": 243,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 63,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → ((B → C) → (A → B)))",
    "queueSize": 242,
    "derivedRaw": "((.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((B → C) → (A → B)))"
  },
  {
    "stepNum": 64,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))",
    "poppedDisplay": "((B → C) → (A → B))",
    "queueSize": 242,
    "derivedRaw": "((.TO .L_.A .L_.B)) ",
    "derivedDisplay": "((A → B))"
  },
  {
    "stepNum": 65,
    "poppedRaw": "(.TO .L_.A (.TO (.TO .L_.B .L_.C) .L_.A))",
    "poppedDisplay": "(A → ((B → C) → A))",
    "queueSize": 241,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 66,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → ((A → C) → (B → C)))",
    "queueSize": 240,
    "derivedRaw": "((.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "(((A → C) → (B → C)))"
  },
  {
    "stepNum": 67,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))",
    "poppedDisplay": "((A → C) → (B → C))",
    "queueSize": 240,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 68,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → ((A → B) → (B → C)))",
    "queueSize": 239,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "(((A → B) → (B → C)))"
  },
  {
    "stepNum": 69,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))",
    "poppedDisplay": "((A → B) → (B → C))",
    "queueSize": 239,
    "derivedRaw": "((.TO .L_.B .L_.C)) ",
    "derivedDisplay": "((B → C))"
  },
  {
    "stepNum": 70,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO .L_.A (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → (A → (B → C)))",
    "queueSize": 238,
    "derivedRaw": "((.TO .L_.A (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "((A → (B → C)))"
  },
  {
    "stepNum": 71,
    "poppedRaw": "(.TO .L_.A (.TO .L_.B .L_.C))",
    "poppedDisplay": "(A → (B → C))",
    "queueSize": 238,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 72,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → ((B → C) → (B → C)))",
    "queueSize": 237,
    "derivedRaw": "((.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "(((B → C) → (B → C)))"
  },
  {
    "stepNum": 73,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))",
    "poppedDisplay": "((B → C) → (B → C))",
    "queueSize": 237,
    "derivedRaw": "((.TO .L_.B .L_.C)) ",
    "derivedDisplay": "((B → C))"
  },
  {
    "stepNum": 74,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → ((A → C) → (B → C))) → (((A → C) → (A → C)) → ((A → C) → (B → C))))",
    "queueSize": 236,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 75,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → ((A → B) → (B → C))) → (((A → C) → (A → B)) → ((A → C) → (B → C))))",
    "queueSize": 235,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 76,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → (A → (B → C))) → (((A → C) → A) → ((A → C) → (B → C))))",
    "queueSize": 234,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 77,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → ((B → C) → (A → C))) → (((A → C) → (B → C)) → ((A → C) → (A → C))))",
    "queueSize": 233,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → (B → C)) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 78,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → (B → C)) → ((A → C) → (A → C)))",
    "queueSize": 233,
    "derivedRaw": "((.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) ",
    "derivedDisplay": "(((A → C) → (A → C)))"
  },
  {
    "stepNum": 79,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → ((B → C) → (A → B))) → (((A → C) → (B → C)) → ((A → C) → (A → B))))",
    "queueSize": 232,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 80,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → ((B → C) → A)) → (((A → C) → (B → C)) → ((A → C) → A)))",
    "queueSize": 231,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 81,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → ((B → C) → (B → C))) → (((A → C) → (B → C)) → ((A → C) → (B → C))))",
    "queueSize": 230,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 82,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → ((A → C) → (B → C))) → (((A → B) → (A → C)) → ((A → B) → (B → C))))",
    "queueSize": 229,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 83,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → ((A → B) → (B → C))) → (((A → B) → (A → B)) → ((A → B) → (B → C))))",
    "queueSize": 228,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 84,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → (A → (B → C))) → (((A → B) → A) → ((A → B) → (B → C))))",
    "queueSize": 227,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 85,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → ((B → C) → (A → C))) → (((A → B) → (B → C)) → ((A → B) → (A → C))))",
    "queueSize": 226,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 86,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → ((B → C) → (A → B))) → (((A → B) → (B → C)) → ((A → B) → (A → B))))",
    "queueSize": 225,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → (B → C)) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 87,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → (B → C)) → ((A → B) → (A → B)))",
    "queueSize": 225,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((A → B) → (A → B)))"
  },
  {
    "stepNum": 88,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → ((B → C) → A)) → (((A → B) → (B → C)) → ((A → B) → A)))",
    "queueSize": 224,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 89,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → ((B → C) → (B → C))) → (((A → B) → (B → C)) → ((A → B) → (B → C))))",
    "queueSize": 223,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 90,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((A → ((A → C) → (B → C))) → ((A → (A → C)) → (A → (B → C))))",
    "queueSize": 222,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 91,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((A → ((A → B) → (B → C))) → ((A → (A → B)) → (A → (B → C))))",
    "queueSize": 221,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 92,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A (.TO .L_.B .L_.C))) (.TO (.TO .L_.A .L_.A) (.TO .L_.A (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((A → (A → (B → C))) → ((A → A) → (A → (B → C))))",
    "queueSize": 220,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 93,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((A → ((B → C) → (A → C))) → ((A → (B → C)) → (A → (A → C))))",
    "queueSize": 219,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 94,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((A → ((B → C) → (A → B))) → ((A → (B → C)) → (A → (A → B))))",
    "queueSize": 218,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 95,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) .L_.A)) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A .L_.A)))",
    "poppedDisplay": "((A → ((B → C) → A)) → ((A → (B → C)) → (A → A)))",
    "queueSize": 217,
    "derivedRaw": "((.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A .L_.A))) ",
    "derivedDisplay": "(((A → (B → C)) → (A → A)))"
  },
  {
    "stepNum": 96,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((A → (B → C)) → (A → A))",
    "queueSize": 217,
    "derivedRaw": "((.TO .L_.A .L_.A)) ",
    "derivedDisplay": "((A → A))"
  },
  {
    "stepNum": 97,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((A → ((B → C) → (B → C))) → ((A → (B → C)) → (A → (B → C))))",
    "queueSize": 216,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 98,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((B → C) → ((A → C) → (A → C))) → (((B → C) → (A → C)) → ((B → C) → (A → C))))",
    "queueSize": 215,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 99,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((B → C) → ((A → C) → (A → B))) → (((B → C) → (A → C)) → ((B → C) → (A → B))))",
    "queueSize": 214,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 100,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) .L_.A)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) .L_.A)))",
    "poppedDisplay": "(((B → C) → ((A → C) → A)) → (((B → C) → (A → C)) → ((B → C) → A)))",
    "queueSize": 213,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 101,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((B → C) → ((A → C) → (B → C))) → (((B → C) → (A → C)) → ((B → C) → (B → C))))",
    "queueSize": 212,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))) ",
    "derivedDisplay": "((((B → C) → (A → C)) → ((B → C) → (B → C))))"
  },
  {
    "stepNum": 102,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "(((B → C) → (A → C)) → ((B → C) → (B → C)))",
    "queueSize": 212,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 103,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((B → C) → ((A → B) → (A → C))) → (((B → C) → (A → B)) → ((B → C) → (A → C))))",
    "queueSize": 211,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 104,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((B → C) → ((A → B) → (A → B))) → (((B → C) → (A → B)) → ((B → C) → (A → B))))",
    "queueSize": 210,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 105,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) .L_.A)))",
    "poppedDisplay": "(((B → C) → ((A → B) → A)) → (((B → C) → (A → B)) → ((B → C) → A)))",
    "queueSize": 209,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 106,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((B → C) → ((A → B) → (B → C))) → (((B → C) → (A → B)) → ((B → C) → (B → C))))",
    "queueSize": 208,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))) ",
    "derivedDisplay": "((((B → C) → (A → B)) → ((B → C) → (B → C))))"
  },
  {
    "stepNum": 107,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "(((B → C) → (A → B)) → ((B → C) → (B → C)))",
    "queueSize": 208,
    "derivedRaw": "((.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "(((B → C) → (B → C)))"
  },
  {
    "stepNum": 108,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((B → C) → (A → (A → C))) → (((B → C) → A) → ((B → C) → (A → C))))",
    "queueSize": 207,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 109,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((B → C) → (A → (A → B))) → (((B → C) → A) → ((B → C) → (A → B))))",
    "queueSize": 206,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 110,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.A)) (.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) .L_.A)))",
    "poppedDisplay": "(((B → C) → (A → A)) → (((B → C) → A) → ((B → C) → A)))",
    "queueSize": 205,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 111,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((B → C) → (A → (B → C))) → (((B → C) → A) → ((B → C) → (B → C))))",
    "queueSize": 204,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))) ",
    "derivedDisplay": "((((B → C) → A) → ((B → C) → (B → C))))"
  },
  {
    "stepNum": 112,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "(((B → C) → A) → ((B → C) → (B → C)))",
    "queueSize": 204,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 113,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((B → C) → ((B → C) → (A → C))) → (((B → C) → (B → C)) → ((B → C) → (A → C))))",
    "queueSize": 203,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 114,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((B → C) → ((B → C) → (A → B))) → (((B → C) → (B → C)) → ((B → C) → (A → B))))",
    "queueSize": 202,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 115,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) .L_.A)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) .L_.A)))",
    "poppedDisplay": "(((B → C) → ((B → C) → A)) → (((B → C) → (B → C)) → ((B → C) → A)))",
    "queueSize": 201,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 116,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((B → C) → ((B → C) → (B → C))) → (((B → C) → (B → C)) → ((B → C) → (B → C))))",
    "queueSize": 200,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))) ",
    "derivedDisplay": "((((B → C) → (B → C)) → ((B → C) → (B → C))))"
  },
  {
    "stepNum": 117,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "(((B → C) → (B → C)) → ((B → C) → (B → C)))",
    "queueSize": 200,
    "derivedRaw": "((.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "(((B → C) → (B → C)))"
  },
  {
    "stepNum": 118,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.C)) (.NEG (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((¬(B → C) → ¬(A → C)) → ((A → C) → (B → C)))",
    "queueSize": 199,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 119,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.C)) (.NEG (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((¬(B → C) → ¬(A → B)) → ((A → B) → (B → C)))",
    "queueSize": 198,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 120,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.C)) (.NEG .L_.A)) (.TO .L_.A (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((¬(B → C) → ¬A) → (A → (B → C)))",
    "queueSize": 197,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 121,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.C)) (.NEG (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((¬(A → C) → ¬(B → C)) → ((B → C) → (A → C)))",
    "queueSize": 196,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 122,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.B)) (.NEG (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((¬(A → B) → ¬(B → C)) → ((B → C) → (A → B)))",
    "queueSize": 195,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 123,
    "poppedRaw": "(.TO (.TO (.NEG .L_.A) (.NEG (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.C) .L_.A))",
    "poppedDisplay": "((¬A → ¬(B → C)) → ((B → C) → A))",
    "queueSize": 194,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 124,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.C)) (.NEG (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((¬(B → C) → ¬(B → C)) → ((B → C) → (B → C)))",
    "queueSize": 193,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 125,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.B (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → (B → (A → C)))",
    "queueSize": 192,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 126,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.B (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → (B → (A → B)))",
    "queueSize": 191,
    "derivedRaw": "((.TO .L_.B (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "((B → (A → B)))"
  },
  {
    "stepNum": 127,
    "poppedRaw": "(.TO .L_.B (.TO .L_.A .L_.B))",
    "poppedDisplay": "(B → (A → B))",
    "queueSize": 191,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 128,
    "poppedRaw": "(.TO .L_.A (.TO .L_.B .L_.A))",
    "poppedDisplay": "(A → (B → A))",
    "queueSize": 190,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 129,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO .L_.B (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → (B → (B → C)))",
    "queueSize": 189,
    "derivedRaw": "((.TO .L_.B (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "((B → (B → C)))"
  },
  {
    "stepNum": 130,
    "poppedRaw": "(.TO .L_.B (.TO .L_.B .L_.C))",
    "poppedDisplay": "(B → (B → C))",
    "queueSize": 189,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 131,
    "poppedRaw": "(.TO .L_.B (.TO (.TO .L_.A .L_.C) .L_.B))",
    "poppedDisplay": "(B → ((A → C) → B))",
    "queueSize": 188,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 132,
    "poppedRaw": "(.TO .L_.B (.TO (.TO .L_.A .L_.B) .L_.B))",
    "poppedDisplay": "(B → ((A → B) → B))",
    "queueSize": 187,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 133,
    "poppedRaw": "(.TO .L_.B (.TO (.TO .L_.B .L_.C) .L_.B))",
    "poppedDisplay": "(B → ((B → C) → B))",
    "queueSize": 185,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 134,
    "poppedRaw": "(.TO .L_.B (.TO .L_.B .L_.B))",
    "poppedDisplay": "(B → (B → B))",
    "queueSize": 184,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 135,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → ((A → C) → B)) → (((A → C) → (A → C)) → ((A → C) → B)))",
    "queueSize": 183,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 136,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → ((A → B) → B)) → (((A → C) → (A → B)) → ((A → C) → B)))",
    "queueSize": 182,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 137,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → (A → B)) → (((A → C) → A) → ((A → C) → B)))",
    "queueSize": 181,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.B))) ",
    "derivedDisplay": "((((A → C) → A) → ((A → C) → B)))"
  },
  {
    "stepNum": 138,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.B))",
    "poppedDisplay": "(((A → C) → A) → ((A → C) → B))",
    "queueSize": 181,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 139,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → ((B → C) → B)) → (((A → C) → (B → C)) → ((A → C) → B)))",
    "queueSize": 180,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 140,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → (B → (A → C))) → (((A → C) → B) → ((A → C) → (A → C))))",
    "queueSize": 179,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → B) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 141,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → B) → ((A → C) → (A → C)))",
    "queueSize": 179,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 142,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → (B → (A → B))) → (((A → C) → B) → ((A → C) → (A → B))))",
    "queueSize": 178,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 143,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → (B → A)) → (((A → C) → B) → ((A → C) → A)))",
    "queueSize": 177,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 144,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → (B → (B → C))) → (((A → C) → B) → ((A → C) → (B → C))))",
    "queueSize": 176,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 145,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → (B → B)) → (((A → C) → B) → ((A → C) → B)))",
    "queueSize": 175,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 146,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → ((A → C) → B)) → (((A → B) → (A → C)) → ((A → B) → B)))",
    "queueSize": 174,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 147,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → ((A → B) → B)) → (((A → B) → (A → B)) → ((A → B) → B)))",
    "queueSize": 173,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 148,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → (A → B)) → (((A → B) → A) → ((A → B) → B)))",
    "queueSize": 172,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.B))) ",
    "derivedDisplay": "((((A → B) → A) → ((A → B) → B)))"
  },
  {
    "stepNum": 149,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.B))",
    "poppedDisplay": "(((A → B) → A) → ((A → B) → B))",
    "queueSize": 172,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 150,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → ((B → C) → B)) → (((A → B) → (B → C)) → ((A → B) → B)))",
    "queueSize": 171,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 151,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → (B → (A → C))) → (((A → B) → B) → ((A → B) → (A → C))))",
    "queueSize": 170,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 152,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → (B → (A → B))) → (((A → B) → B) → ((A → B) → (A → B))))",
    "queueSize": 169,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → B) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 153,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → B) → ((A → B) → (A → B)))",
    "queueSize": 169,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 154,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → (B → A)) → (((A → B) → B) → ((A → B) → A)))",
    "queueSize": 168,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 155,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → (B → (B → C))) → (((A → B) → B) → ((A → B) → (B → C))))",
    "queueSize": 167,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 156,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → (B → B)) → (((A → B) → B) → ((A → B) → B)))",
    "queueSize": 166,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 157,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) .L_.B)) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → ((A → C) → B)) → ((A → (A → C)) → (A → B)))",
    "queueSize": 165,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 158,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) .L_.B)) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → ((A → B) → B)) → ((A → (A → B)) → (A → B)))",
    "queueSize": 164,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 159,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → (A → B)) → ((A → A) → (A → B)))",
    "queueSize": 163,
    "derivedRaw": "((.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "(((A → A) → (A → B)))"
  },
  {
    "stepNum": 160,
    "poppedRaw": "(.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.B))",
    "poppedDisplay": "((A → A) → (A → B))",
    "queueSize": 163,
    "derivedRaw": "((.TO .L_.A .L_.B)) ",
    "derivedDisplay": "((A → B))"
  },
  {
    "stepNum": 161,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) .L_.B)) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → ((B → C) → B)) → ((A → (B → C)) → (A → B)))",
    "queueSize": 162,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 162,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((A → (B → (A → C))) → ((A → B) → (A → (A → C))))",
    "queueSize": 161,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 163,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((A → (B → (A → B))) → ((A → B) → (A → (A → B))))",
    "queueSize": 160,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 164,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B .L_.A)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.A)))",
    "poppedDisplay": "((A → (B → A)) → ((A → B) → (A → A)))",
    "queueSize": 159,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.A))) ",
    "derivedDisplay": "(((A → B) → (A → A)))"
  },
  {
    "stepNum": 165,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.A))",
    "poppedDisplay": "((A → B) → (A → A))",
    "queueSize": 159,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO .L_.A .L_.A)) ",
    "derivedDisplay": "((((A → B) → A) → ((A → B) → A)) (A → A))"
  },
  {
    "stepNum": 166,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.A))",
    "poppedDisplay": "(((A → B) → A) → ((A → B) → A))",
    "queueSize": 160,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 167,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B (.TO .L_.B .L_.C))) (.TO (.TO .L_.A .L_.B) (.TO .L_.A (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((A → (B → (B → C))) → ((A → B) → (A → (B → C))))",
    "queueSize": 158,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 168,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B .L_.B)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → (B → B)) → ((A → B) → (A → B)))",
    "queueSize": 157,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 169,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.C) .L_.B)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.B .L_.C) .L_.B)))",
    "poppedDisplay": "(((B → C) → ((A → C) → B)) → (((B → C) → (A → C)) → ((B → C) → B)))",
    "queueSize": 156,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 170,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.A .L_.B) .L_.B)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.C) .L_.B)))",
    "poppedDisplay": "(((B → C) → ((A → B) → B)) → (((B → C) → (A → B)) → ((B → C) → B)))",
    "queueSize": 155,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 171,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) .L_.B)))",
    "poppedDisplay": "(((B → C) → (A → B)) → (((B → C) → A) → ((B → C) → B)))",
    "queueSize": 154,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) .L_.B))) ",
    "derivedDisplay": "((((B → C) → A) → ((B → C) → B)))"
  },
  {
    "stepNum": 172,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) .L_.A) (.TO (.TO .L_.B .L_.C) .L_.B))",
    "poppedDisplay": "(((B → C) → A) → ((B → C) → B))",
    "queueSize": 154,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 173,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) .L_.B)) (.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.B .L_.C) .L_.B)))",
    "poppedDisplay": "(((B → C) → ((B → C) → B)) → (((B → C) → (B → C)) → ((B → C) → B)))",
    "queueSize": 153,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 174,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((B → C) → (B → (A → C))) → (((B → C) → B) → ((B → C) → (A → C))))",
    "queueSize": 152,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 175,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((B → C) → (B → (A → B))) → (((B → C) → B) → ((B → C) → (A → B))))",
    "queueSize": 151,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 176,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.A)) (.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) .L_.A)))",
    "poppedDisplay": "(((B → C) → (B → A)) → (((B → C) → B) → ((B → C) → A)))",
    "queueSize": 150,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 177,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((B → C) → (B → (B → C))) → (((B → C) → B) → ((B → C) → (B → C))))",
    "queueSize": 149,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))) ",
    "derivedDisplay": "((((B → C) → B) → ((B → C) → (B → C))))"
  },
  {
    "stepNum": 178,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C)))",
    "poppedDisplay": "(((B → C) → B) → ((B → C) → (B → C)))",
    "queueSize": 149,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 179,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.B)) (.TO (.TO (.TO .L_.B .L_.C) .L_.B) (.TO (.TO .L_.B .L_.C) .L_.B)))",
    "poppedDisplay": "(((B → C) → (B → B)) → (((B → C) → B) → ((B → C) → B)))",
    "queueSize": 148,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 180,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((B → ((A → C) → (A → C))) → ((B → (A → C)) → (B → (A → C))))",
    "queueSize": 147,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 181,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((B → ((A → C) → (A → B))) → ((B → (A → C)) → (B → (A → B))))",
    "queueSize": 146,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 182,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.C) .L_.A)) (.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → ((A → C) → A)) → ((B → (A → C)) → (B → A)))",
    "queueSize": 145,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 183,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((B → ((A → C) → (B → C))) → ((B → (A → C)) → (B → (B → C))))",
    "queueSize": 144,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 184,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.C) .L_.B)) (.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → ((A → C) → B)) → ((B → (A → C)) → (B → B)))",
    "queueSize": 143,
    "derivedRaw": "((.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → (A → C)) → (B → B)))"
  },
  {
    "stepNum": 185,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → (A → C)) → (B → B))",
    "queueSize": 143,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 186,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) (.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((B → ((A → B) → (A → C))) → ((B → (A → B)) → (B → (A → C))))",
    "queueSize": 142,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 187,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))) (.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((B → ((A → B) → (A → B))) → ((B → (A → B)) → (B → (A → B))))",
    "queueSize": 141,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 188,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.B) .L_.A)) (.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → ((A → B) → A)) → ((B → (A → B)) → (B → A)))",
    "queueSize": 140,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 189,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))) (.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((B → ((A → B) → (B → C))) → ((B → (A → B)) → (B → (B → C))))",
    "queueSize": 139,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 190,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.A .L_.B) .L_.B)) (.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → ((A → B) → B)) → ((B → (A → B)) → (B → B)))",
    "queueSize": 138,
    "derivedRaw": "((.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → (A → B)) → (B → B)))"
  },
  {
    "stepNum": 191,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → (A → B)) → (B → B))",
    "queueSize": 138,
    "derivedRaw": "((.TO .L_.B .L_.B)) ",
    "derivedDisplay": "((B → B))"
  },
  {
    "stepNum": 192,
    "poppedRaw": "(.TO .L_.B .L_.B)",
    "poppedDisplay": "(B → B)",
    "queueSize": 138,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 193,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A (.TO .L_.A .L_.C))) (.TO (.TO .L_.B .L_.A) (.TO .L_.B (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((B → (A → (A → C))) → ((B → A) → (B → (A → C))))",
    "queueSize": 137,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 194,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A (.TO .L_.A .L_.B))) (.TO (.TO .L_.B .L_.A) (.TO .L_.B (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((B → (A → (A → B))) → ((B → A) → (B → (A → B))))",
    "queueSize": 136,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 195,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A .L_.A)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → (A → A)) → ((B → A) → (B → A)))",
    "queueSize": 135,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 196,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.A) (.TO .L_.B (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((B → (A → (B → C))) → ((B → A) → (B → (B → C))))",
    "queueSize": 134,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 197,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.A .L_.B)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → (A → B)) → ((B → A) → (B → B)))",
    "queueSize": 133,
    "derivedRaw": "((.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → A) → (B → B)))"
  },
  {
    "stepNum": 198,
    "poppedRaw": "(.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → A) → (B → B))",
    "queueSize": 133,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 199,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C))) (.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((B → ((B → C) → (A → C))) → ((B → (B → C)) → (B → (A → C))))",
    "queueSize": 132,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 200,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.B))) (.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((B → ((B → C) → (A → B))) → ((B → (B → C)) → (B → (A → B))))",
    "queueSize": 131,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 201,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.C) .L_.A)) (.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → ((B → C) → A)) → ((B → (B → C)) → (B → A)))",
    "queueSize": 130,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 202,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.C) (.TO .L_.B .L_.C))) (.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((B → ((B → C) → (B → C))) → ((B → (B → C)) → (B → (B → C))))",
    "queueSize": 129,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 203,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.C) .L_.B)) (.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → ((B → C) → B)) → ((B → (B → C)) → (B → B)))",
    "queueSize": 128,
    "derivedRaw": "((.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → (B → C)) → (B → B)))"
  },
  {
    "stepNum": 204,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B .L_.C)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → (B → C)) → (B → B))",
    "queueSize": 128,
    "derivedRaw": "((.TO .L_.B .L_.B)) ",
    "derivedDisplay": "((B → B))"
  },
  {
    "stepNum": 205,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B (.TO .L_.A .L_.C))) (.TO (.TO .L_.B .L_.B) (.TO .L_.B (.TO .L_.A .L_.C))))",
    "poppedDisplay": "((B → (B → (A → C))) → ((B → B) → (B → (A → C))))",
    "queueSize": 127,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 206,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B (.TO .L_.A .L_.B))) (.TO (.TO .L_.B .L_.B) (.TO .L_.B (.TO .L_.A .L_.B))))",
    "poppedDisplay": "((B → (B → (A → B))) → ((B → B) → (B → (A → B))))",
    "queueSize": 126,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 207,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → (B → A)) → ((B → B) → (B → A)))",
    "queueSize": 125,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 208,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.B) (.TO .L_.B (.TO .L_.B .L_.C))))",
    "poppedDisplay": "((B → (B → (B → C))) → ((B → B) → (B → (B → C))))",
    "queueSize": 124,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 209,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B .L_.B)) (.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → (B → B)) → ((B → B) → (B → B)))",
    "queueSize": 123,
    "derivedRaw": "((.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → B) → (B → B)))"
  },
  {
    "stepNum": 210,
    "poppedRaw": "(.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → B) → (B → B))",
    "queueSize": 123,
    "derivedRaw": "((.TO .L_.B .L_.B)) ",
    "derivedDisplay": "((B → B))"
  },
  {
    "stepNum": 211,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG (.TO .L_.A .L_.C))) (.TO (.TO .L_.A .L_.C) .L_.B))",
    "poppedDisplay": "((¬B → ¬(A → C)) → ((A → C) → B))",
    "queueSize": 122,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 212,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG (.TO .L_.A .L_.B))) (.TO (.TO .L_.A .L_.B) .L_.B))",
    "poppedDisplay": "((¬B → ¬(A → B)) → ((A → B) → B))",
    "queueSize": 121,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 213,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG .L_.A)) (.TO .L_.A .L_.B))",
    "poppedDisplay": "((¬B → ¬A) → (A → B))",
    "queueSize": 120,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 214,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG (.TO .L_.B .L_.C))) (.TO (.TO .L_.B .L_.C) .L_.B))",
    "poppedDisplay": "((¬B → ¬(B → C)) → ((B → C) → B))",
    "queueSize": 119,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 215,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.C)) (.NEG .L_.B)) (.TO .L_.B (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((¬(A → C) → ¬B) → (B → (A → C)))",
    "queueSize": 118,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 216,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.A .L_.B)) (.NEG .L_.B)) (.TO .L_.B (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((¬(A → B) → ¬B) → (B → (A → B)))",
    "queueSize": 117,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 217,
    "poppedRaw": "(.TO (.TO (.NEG .L_.A) (.NEG .L_.B)) (.TO .L_.B .L_.A))",
    "poppedDisplay": "((¬A → ¬B) → (B → A))",
    "queueSize": 116,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 218,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.C)) (.NEG .L_.B)) (.TO .L_.B (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((¬(B → C) → ¬B) → (B → (B → C)))",
    "queueSize": 115,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 219,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG .L_.B)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((¬B → ¬B) → (B → B))",
    "queueSize": 114,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 220,
    "poppedRaw": "(.TO (.TO .L_.A .L_.C) (.TO .L_.C (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → C) → (C → (A → C)))",
    "queueSize": 113,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 221,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.C (.TO .L_.A .L_.B)))",
    "poppedDisplay": "((A → B) → (C → (A → B)))",
    "queueSize": 112,
    "derivedRaw": "((.TO .L_.C (.TO .L_.A .L_.B))) ",
    "derivedDisplay": "((C → (A → B)))"
  },
  {
    "stepNum": 222,
    "poppedRaw": "(.TO .L_.C (.TO .L_.A .L_.B))",
    "poppedDisplay": "(C → (A → B))",
    "queueSize": 112,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 223,
    "poppedRaw": "(.TO .L_.A (.TO .L_.C .L_.A))",
    "poppedDisplay": "(A → (C → A))",
    "queueSize": 111,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 224,
    "poppedRaw": "(.TO (.TO .L_.B .L_.C) (.TO .L_.C (.TO .L_.B .L_.C)))",
    "poppedDisplay": "((B → C) → (C → (B → C)))",
    "queueSize": 110,
    "derivedRaw": "((.TO .L_.C (.TO .L_.B .L_.C))) ",
    "derivedDisplay": "((C → (B → C)))"
  },
  {
    "stepNum": 225,
    "poppedRaw": "(.TO .L_.C (.TO .L_.B .L_.C))",
    "poppedDisplay": "(C → (B → C))",
    "queueSize": 110,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 226,
    "poppedRaw": "(.TO .L_.B (.TO .L_.C .L_.B))",
    "poppedDisplay": "(B → (C → B))",
    "queueSize": 109,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 227,
    "poppedRaw": "(.TO .L_.C (.TO (.TO .L_.A .L_.C) .L_.C))",
    "poppedDisplay": "(C → ((A → C) → C))",
    "queueSize": 108,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 228,
    "poppedRaw": "(.TO .L_.C (.TO (.TO .L_.A .L_.B) .L_.C))",
    "poppedDisplay": "(C → ((A → B) → C))",
    "queueSize": 107,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 229,
    "poppedRaw": "(.TO .L_.C (.TO .L_.A .L_.C))",
    "poppedDisplay": "(C → (A → C))",
    "queueSize": 106,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 230,
    "poppedRaw": "(.TO .L_.C (.TO (.TO .L_.B .L_.C) .L_.C))",
    "poppedDisplay": "(C → ((B → C) → C))",
    "queueSize": 105,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 231,
    "poppedRaw": "(.TO .L_.C (.TO .L_.C .L_.C))",
    "poppedDisplay": "(C → (C → C))",
    "queueSize": 103,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 232,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.C) .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → ((A → C) → C)) → (((A → C) → (A → C)) → ((A → C) → C)))",
    "queueSize": 102,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 233,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.A .L_.B) .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → ((A → B) → C)) → (((A → C) → (A → B)) → ((A → C) → C)))",
    "queueSize": 101,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 234,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → (A → C)) → (((A → C) → A) → ((A → C) → C)))",
    "queueSize": 100,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.C))) ",
    "derivedDisplay": "((((A → C) → A) → ((A → C) → C)))"
  },
  {
    "stepNum": 235,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.A) (.TO (.TO .L_.A .L_.C) .L_.C))",
    "poppedDisplay": "(((A → C) → A) → ((A → C) → C))",
    "queueSize": 100,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 236,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO (.TO .L_.B .L_.C) .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → ((B → C) → C)) → (((A → C) → (B → C)) → ((A → C) → C)))",
    "queueSize": 99,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 237,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → (B → C)) → (((A → C) → B) → ((A → C) → C)))",
    "queueSize": 98,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) .L_.C))) ",
    "derivedDisplay": "((((A → C) → B) → ((A → C) → C)))"
  },
  {
    "stepNum": 238,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.B) (.TO (.TO .L_.A .L_.C) .L_.C))",
    "poppedDisplay": "(((A → C) → B) → ((A → C) → C))",
    "queueSize": 98,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 239,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → C) → (C → (A → C))) → (((A → C) → C) → ((A → C) → (A → C))))",
    "queueSize": 97,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))) ",
    "derivedDisplay": "((((A → C) → C) → ((A → C) → (A → C))))"
  },
  {
    "stepNum": 240,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "(((A → C) → C) → ((A → C) → (A → C)))",
    "queueSize": 97,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 241,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → C) → (C → (A → B))) → (((A → C) → C) → ((A → C) → (A → B))))",
    "queueSize": 96,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 242,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C .L_.A)) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) .L_.A)))",
    "poppedDisplay": "(((A → C) → (C → A)) → (((A → C) → C) → ((A → C) → A)))",
    "queueSize": 95,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 243,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → C) → (C → (B → C))) → (((A → C) → C) → ((A → C) → (B → C))))",
    "queueSize": 94,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 244,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C .L_.B)) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) .L_.B)))",
    "poppedDisplay": "(((A → C) → (C → B)) → (((A → C) → C) → ((A → C) → B)))",
    "queueSize": 93,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 245,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.C) (.TO .L_.C .L_.C)) (.TO (.TO (.TO .L_.A .L_.C) .L_.C) (.TO (.TO .L_.A .L_.C) .L_.C)))",
    "poppedDisplay": "(((A → C) → (C → C)) → (((A → C) → C) → ((A → C) → C)))",
    "queueSize": 92,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 246,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.C) .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → ((A → C) → C)) → (((A → B) → (A → C)) → ((A → B) → C)))",
    "queueSize": 91,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 247,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → ((A → B) → C)) → (((A → B) → (A → B)) → ((A → B) → C)))",
    "queueSize": 90,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 248,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → (A → C)) → (((A → B) → A) → ((A → B) → C)))",
    "queueSize": 89,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 249,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO (.TO .L_.B .L_.C) .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → ((B → C) → C)) → (((A → B) → (B → C)) → ((A → B) → C)))",
    "queueSize": 88,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 250,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → (B → C)) → (((A → B) → B) → ((A → B) → C)))",
    "queueSize": 87,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) .L_.C))) ",
    "derivedDisplay": "((((A → B) → B) → ((A → B) → C)))"
  },
  {
    "stepNum": 251,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.B) (.TO (.TO .L_.A .L_.B) .L_.C))",
    "poppedDisplay": "(((A → B) → B) → ((A → B) → C))",
    "queueSize": 87,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 252,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C (.TO .L_.A .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))))",
    "poppedDisplay": "(((A → B) → (C → (A → C))) → (((A → B) → C) → ((A → B) → (A → C))))",
    "queueSize": 86,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 253,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C (.TO .L_.A .L_.B))) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B))))",
    "poppedDisplay": "(((A → B) → (C → (A → B))) → (((A → B) → C) → ((A → B) → (A → B))))",
    "queueSize": 85,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))) ",
    "derivedDisplay": "((((A → B) → C) → ((A → B) → (A → B))))"
  },
  {
    "stepNum": 254,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)))",
    "poppedDisplay": "(((A → B) → C) → ((A → B) → (A → B)))",
    "queueSize": 85,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 255,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C .L_.A)) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) .L_.A)))",
    "poppedDisplay": "(((A → B) → (C → A)) → (((A → B) → C) → ((A → B) → A)))",
    "queueSize": 84,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 256,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C (.TO .L_.B .L_.C))) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) (.TO .L_.B .L_.C))))",
    "poppedDisplay": "(((A → B) → (C → (B → C))) → (((A → B) → C) → ((A → B) → (B → C))))",
    "queueSize": 83,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 257,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C .L_.B)) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) .L_.B)))",
    "poppedDisplay": "(((A → B) → (C → B)) → (((A → B) → C) → ((A → B) → B)))",
    "queueSize": 82,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 258,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) (.TO .L_.C .L_.C)) (.TO (.TO (.TO .L_.A .L_.B) .L_.C) (.TO (.TO .L_.A .L_.B) .L_.C)))",
    "poppedDisplay": "(((A → B) → (C → C)) → (((A → B) → C) → ((A → B) → C)))",
    "queueSize": 81,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 259,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.C) .L_.C)) (.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → ((A → C) → C)) → ((A → (A → C)) → (A → C)))",
    "queueSize": 80,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 260,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.A .L_.B) .L_.C)) (.TO (.TO .L_.A (.TO .L_.A .L_.B)) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → ((A → B) → C)) → ((A → (A → B)) → (A → C)))",
    "queueSize": 79,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 261,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.A) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → (A → C)) → ((A → A) → (A → C)))",
    "queueSize": 78,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 262,
    "poppedRaw": "(.TO (.TO .L_.A (.TO (.TO .L_.B .L_.C) .L_.C)) (.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → ((B → C) → C)) → ((A → (B → C)) → (A → C)))",
    "queueSize": 77,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 263,
    "poppedRaw": "(.TO (.TO .L_.A (.TO .L_.B .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)))",
    "poppedDisplay": "((A → (B → C)) → ((A → B) → (A → C)))",
    "queueSize": 76,
    "derivedRaw": "((.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))) ",
    "derivedDisplay": "(((A → B) → (A → C)))"
  },
  {
    "stepNum": 264,
    "poppedRaw": "(.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C))",
    "poppedDisplay": "((A → B) → (A → C))",
    "queueSize": 76,
    "derivedRaw": "((.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.C)) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.B)) (.TO .L_.A .L_.C)) ",
    "derivedDisplay": "((((A → B) → A) → ((A → B) → C)) ((A → B) → (A → B)) (A → C))"
  },
  {
    "stepNum": 265,
    "poppedRaw": "(.TO (.TO (.TO .L_.A .L_.B) .L_.A) (.TO (.TO .L_.A .L_.B) .L_.C))",
    "poppedDisplay": "(((A → B) → A) → ((A → B) → C))",
    "queueSize": 78,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 266,
    "poppedRaw": "(.TO .L_.A .L_.C)",
    "poppedDisplay": "(A → C)",
    "queueSize": 76,
    "derivedRaw": "((.TO .L_.C (.TO .L_.A .L_.C)) (.TO .L_.B (.TO .L_.A .L_.C)) (.TO .L_.B .L_.C) (.TO (.TO .L_.B .L_.C) (.TO .L_.A .L_.C)) (.TO .L_.A (.TO .L_.A .L_.C)) (.TO .L_.A .L_.C) (.TO .L_.A .L_.B) (.TO (.TO .L_.A .L_.B) (.TO .L_.A .L_.C)) (.TO (.TO .L_.A .L_.C) (.TO .L_.A .L_.C))) ",
    "derivedDisplay": "((C → (A → C)) (B → (A → C)) (B → C) ((B → C) → (A → C)) (A → (A → C)) (A → C) (A → B) ((A → B) → (A → C)) ((A → C) → (A → C)))"
  }
];

export const AXIOM_STEPS: DetailedStep[] = [
  {
    "stepNum": 1,
    "poppedRaw": ".L_.A",
    "poppedDisplay": "A",
    "queueSize": 46,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 2,
    "poppedRaw": "(.TO (.TO .L_.B .L_.A) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → A) → ((B → A) → (B → A)))",
    "queueSize": 45,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 3,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A))) (.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A))))",
    "poppedDisplay": "(((B → A) → ((B → A) → (B → A))) → (((B → A) → (B → A)) → ((B → A) → (B → A))))",
    "queueSize": 44,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))) ",
    "derivedDisplay": "((((B → A) → (B → A)) → ((B → A) → (B → A))))"
  },
  {
    "stepNum": 4,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "(((B → A) → (B → A)) → ((B → A) → (B → A)))",
    "queueSize": 44,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 5,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.A)) (.NEG (.TO .L_.B .L_.A))) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((¬(B → A) → ¬(B → A)) → ((B → A) → (B → A)))",
    "queueSize": 43,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 6,
    "poppedRaw": "(.TO (.TO .L_.B .L_.A) (.TO .L_.B (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → A) → (B → (B → A)))",
    "queueSize": 42,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 7,
    "poppedRaw": "(.TO .L_.B (.TO (.TO .L_.B .L_.A) .L_.B))",
    "poppedDisplay": "(B → ((B → A) → B))",
    "queueSize": 41,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 8,
    "poppedRaw": "(.TO .L_.B (.TO .L_.B .L_.B))",
    "poppedDisplay": "(B → (B → B))",
    "queueSize": 40,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 9,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) (.TO (.TO .L_.B .L_.A) .L_.B)) (.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.A) .L_.B)))",
    "poppedDisplay": "(((B → A) → ((B → A) → B)) → (((B → A) → (B → A)) → ((B → A) → B)))",
    "queueSize": 39,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 10,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B (.TO .L_.B .L_.A))) (.TO (.TO (.TO .L_.B .L_.A) .L_.B) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A))))",
    "poppedDisplay": "(((B → A) → (B → (B → A))) → (((B → A) → B) → ((B → A) → (B → A))))",
    "queueSize": 38,
    "derivedRaw": "((.TO (.TO (.TO .L_.B .L_.A) .L_.B) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))) ",
    "derivedDisplay": "((((B → A) → B) → ((B → A) → (B → A))))"
  },
  {
    "stepNum": 11,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) .L_.B) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A)))",
    "poppedDisplay": "(((B → A) → B) → ((B → A) → (B → A)))",
    "queueSize": 38,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 12,
    "poppedRaw": "(.TO (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.B)) (.TO (.TO (.TO .L_.B .L_.A) .L_.B) (.TO (.TO .L_.B .L_.A) .L_.B)))",
    "poppedDisplay": "(((B → A) → (B → B)) → (((B → A) → B) → ((B → A) → B)))",
    "queueSize": 37,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 13,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A))) (.TO (.TO .L_.B (.TO .L_.B .L_.A)) (.TO .L_.B (.TO .L_.B .L_.A))))",
    "poppedDisplay": "((B → ((B → A) → (B → A))) → ((B → (B → A)) → (B → (B → A))))",
    "queueSize": 36,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 14,
    "poppedRaw": "(.TO (.TO .L_.B (.TO (.TO .L_.B .L_.A) .L_.B)) (.TO (.TO .L_.B (.TO .L_.B .L_.A)) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → ((B → A) → B)) → ((B → (B → A)) → (B → B)))",
    "queueSize": 35,
    "derivedRaw": "((.TO (.TO .L_.B (.TO .L_.B .L_.A)) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → (B → A)) → (B → B)))"
  },
  {
    "stepNum": 15,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B .L_.A)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → (B → A)) → (B → B))",
    "queueSize": 35,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 16,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B (.TO .L_.B .L_.A))) (.TO (.TO .L_.B .L_.B) (.TO .L_.B (.TO .L_.B .L_.A))))",
    "poppedDisplay": "((B → (B → (B → A))) → ((B → B) → (B → (B → A))))",
    "queueSize": 34,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 17,
    "poppedRaw": "(.TO (.TO .L_.B (.TO .L_.B .L_.B)) (.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B)))",
    "poppedDisplay": "((B → (B → B)) → ((B → B) → (B → B)))",
    "queueSize": 33,
    "derivedRaw": "((.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B))) ",
    "derivedDisplay": "(((B → B) → (B → B)))"
  },
  {
    "stepNum": 18,
    "poppedRaw": "(.TO (.TO .L_.B .L_.B) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((B → B) → (B → B))",
    "queueSize": 33,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 19,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG (.TO .L_.B .L_.A))) (.TO (.TO .L_.B .L_.A) .L_.B))",
    "poppedDisplay": "((¬B → ¬(B → A)) → ((B → A) → B))",
    "queueSize": 32,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 20,
    "poppedRaw": "(.TO (.TO (.NEG (.TO .L_.B .L_.A)) (.NEG .L_.B)) (.TO .L_.B (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((¬(B → A) → ¬B) → (B → (B → A)))",
    "queueSize": 31,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 21,
    "poppedRaw": "(.TO (.TO (.NEG .L_.B) (.NEG .L_.B)) (.TO .L_.B .L_.B))",
    "poppedDisplay": "((¬B → ¬B) → (B → B))",
    "queueSize": 30,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 22,
    "poppedRaw": "(.TO (.TO .L_.B .L_.A) (.TO .L_.A (.TO .L_.B .L_.A)))",
    "poppedDisplay": "((B → A) → (A → (B → A)))",
    "queueSize": 29,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 23,
    "poppedRaw": "(.TO .L_.B (.TO .L_.A .L_.B))",
    "poppedDisplay": "(B → (A → B))",
    "queueSize": 28,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 24,
    "poppedRaw": "(.TO .L_.A (.TO (.TO .L_.B .L_.A) .L_.A))",
    "poppedDisplay": "(A → ((B → A) → A))",
    "queueSize": 27,
    "derivedRaw": "((.TO (.TO .L_.B .L_.A) .L_.A)) ",
    "derivedDisplay": "(((B → A) → A))"
  },
  {
    "stepNum": 25,
    "poppedRaw": "(.TO (.TO .L_.B .L_.A) .L_.A)",
    "poppedDisplay": "((B → A) → A)",
    "queueSize": 27,
    "derivedRaw": "NIL ",
    "derivedDisplay": "NIL"
  },
  {
    "stepNum": 26,
    "poppedRaw": "(.TO .L_.A (.TO .L_.B .L_.A))",
    "poppedDisplay": "(A → (B → A))",
    "queueSize": 26,
    "derivedRaw": "((.TO .L_.B .L_.A)) ",
    "derivedDisplay": "((B → A))"
  },
  {
    "stepNum": 27,
    "poppedRaw": "(.TO .L_.B .L_.A)",
    "poppedDisplay": "(B → A)",
    "queueSize": 26,
    "derivedRaw": "(.L_.A (.TO .L_.A (.TO .L_.B .L_.A)) (.TO .L_.B (.TO .L_.B .L_.A)) (.TO (.TO .L_.B .L_.A) (.TO .L_.B .L_.A))) ",
    "derivedDisplay": "(A (A → (B → A)) (B → (B → A)) ((B → A) → (B → A)))"
  }
];
