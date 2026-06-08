import { Suspense } from "react"
import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, PerspectiveCamera } from "@react-three/drei"
import { WhiteBallRobot } from "@/components/avatar/WhiteBallRobot"

interface RobotRunSceneProps {
  speaking: boolean
  className?: string
}

function Scene({ speaking }: { speaking: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.55, 3.8]} fov={34} />
      <color attach="background" args={["#0a0a10"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} color="#7b2ff7" />
      <pointLight position={[1, 2, 3]} intensity={0.5} color="#ffffff" distance={8} />
      <spotLight
        position={[0, 5, 2]}
        angle={0.45}
        penumbra={0.6}
        intensity={0.7}
        color="#f0f0f5"
      />

      <WhiteBallRobot speaking={speaking} />

      <ContactShadows
        position={[0, -0.78, 0]}
        opacity={0.45}
        scale={7}
        blur={2.5}
        far={3}
        color="#000000"
      />

      <Environment preset="studio" />
    </>
  )
}

function SceneLoadingFallback() {
  return (
    <div className="relative h-full min-h-[320px] w-full bg-[#0a0a10]">
      <BrandedLoadingOverlay
        visible
        mode="absolute"
        status="Loading 3D scene"
        simulateProgress
        showScanOverlay={false}
      />
    </div>
  )
}

export function RobotRunScene({ speaking, className }: RobotRunSceneProps) {
  return (
    <div className={className} style={{ minHeight: 320 }}>
      <Suspense fallback={<SceneLoadingFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#0a0a10", width: "100%", height: "100%" }}
        >
          <Scene speaking={speaking} />
        </Canvas>
      </Suspense>
    </div>
  )
}
