import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { AvatarCharacter } from "@/components/avatar/AvatarCharacter"

interface AvatarSceneProps {
  waving: boolean
  className?: string
}

function SceneContent({
  waving,
  pointer,
}: {
  waving: boolean
  pointer: { x: number; y: number }
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 4.2]} fov={42} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} color="#f0ede8" />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#7b2ff7" />
      <pointLight position={[0, 2, 2]} intensity={0.8} color="#00d4ff" distance={8} />

      <AvatarCharacter waving={waving} pointer={pointer} />

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={4}
        color="#00d4ff"
      />

      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-0.35}
        maxAzimuthAngle={0.35}
      />
    </>
  )
}

export function AvatarScene({ waving, className }: AvatarSceneProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
        setPointer({ x, y })
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent waving={waving} pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  )
}
