import { personal } from "@/data/portfolio"

export const avatarIntro = {
  /**
   * Optional: drop a `.glb` URL here after generating a likeness from your photo
   * (Ready Player Me, Meshcapade, Rodin, etc.). The procedural avatar is used when null.
   */
  modelUrl: null as string | null,

  /** Spline 3D robot scene URL */
  splineScene:
    "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",

  photoUrl: null as string | null,

  lines: [
    `Hey there! Welcome to my portfolio.`,
    `I'm ${personal.name} — a full-stack & AI engineer from ${personal.location}.`,
    `I build real-time systems with React, FastAPI, Python, NLP, and AWS.`,
    `Let me walk you through my work — tap below when you're ready.`,
  ],
}
