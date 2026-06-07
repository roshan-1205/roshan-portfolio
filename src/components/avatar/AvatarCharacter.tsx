import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { avatarIntro } from "@/data/avatar-intro"

interface AvatarCharacterProps {
  waving: boolean
  pointer: { x: number; y: number }
}

function ProceduralAvatar({ waving, pointer }: AvatarCharacterProps) {
  const root = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const ring = useRef<THREE.Mesh>(null)

  const skin = "#c8956c"
  const hair = "#1a1208"
  const shirt = "#12121f"
  const accent = "#00d4ff"

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (root.current) {
      root.current.position.y = Math.sin(t * 1.1) * 0.05 - 1.15
    }

    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        pointer.x * 0.4,
        0.07,
      )
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        -pointer.y * 0.22,
        0.07,
      )
    }

    if (rightArm.current) {
      const wave = waving ? Math.sin(t * 9) * 0.45 + 1.1 : 0.15
      rightArm.current.rotation.z = THREE.MathUtils.lerp(
        rightArm.current.rotation.z,
        wave,
        0.12,
      )
    }

    if (leftArm.current) {
      leftArm.current.rotation.z = THREE.MathUtils.lerp(
        leftArm.current.rotation.z,
        -0.2,
        0.08,
      )
    }

    if (ring.current) {
      ring.current.rotation.z = t * 0.35
      ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.05
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={root}>
        <mesh ref={ring} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.03, 16, 64]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.6}
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.95, 48]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.15}
            transparent
            opacity={0.2}
          />
        </mesh>

        <group position={[0, 0.35, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <capsuleGeometry args={[0.34, 0.72, 8, 16]} />
            <meshStandardMaterial color={shirt} roughness={0.65} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.52, 0.02]}>
            <boxGeometry args={[0.5, 0.08, 0.02]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>

        <group ref={head} position={[0, 1.05, 0]}>
          <mesh>
            <sphereGeometry args={[0.34, 32, 32]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>

          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={hair} roughness={0.85} />
          </mesh>

          <mesh position={[0, 0.02, 0.3]}>
            <boxGeometry args={[0.42, 0.1, 0.04]} />
            <meshStandardMaterial color="#111" metalness={0.4} roughness={0.3} />
          </mesh>

          <mesh position={[-0.12, 0.04, 0.31]}>
            <torusGeometry args={[0.055, 0.012, 8, 24]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0.12, 0.04, 0.31]}>
            <torusGeometry args={[0.055, 0.012, 8, 24]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
          </mesh>

          <mesh position={[-0.12, 0.04, 0.34]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          <mesh position={[0.12, 0.04, 0.34]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>

          <mesh position={[0, -0.08, 0.31]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.07, 0.018, 8, 24, Math.PI, Math.PI]} />
            <meshStandardMaterial color="#8b5a3c" roughness={0.7} />
          </mesh>
        </group>

        <group ref={leftArm} position={[-0.48, 0.62, 0]} rotation={[0, 0, -0.15]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.09, 0.38, 6, 12]} />
            <meshStandardMaterial color={shirt} roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
        </group>

        <group ref={rightArm} position={[0.48, 0.62, 0]} rotation={[0, 0, 0.15]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.09, 0.38, 6, 12]} />
            <meshStandardMaterial color={shirt} roughness={0.65} />
          </mesh>
          <mesh position={[0, -0.5, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
        </group>

        <group position={[-0.18, -0.55, 0]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.11, 0.42, 6, 12]} />
            <meshStandardMaterial color="#1c1c2e" roughness={0.7} />
          </mesh>
        </group>
        <group position={[0.18, -0.55, 0]}>
          <mesh position={[0, -0.28, 0]}>
            <capsuleGeometry args={[0.11, 0.42, 6, 12]} />
            <meshStandardMaterial color="#1c1c2e" roughness={0.7} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

function ExternalAvatar({ pointer }: AvatarCharacterProps) {
  const { scene } = useGLTF(avatarIntro.modelUrl!)
  const root = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (root.current) {
      root.current.position.y = Math.sin(t * 1.1) * 0.04 - 1.1
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        pointer.x * 0.35,
        0.06,
      )
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={root} scale={1.2}>
        <primitive object={scene.clone()} />
      </group>
    </Float>
  )
}

export function AvatarCharacter(props: AvatarCharacterProps) {
  if (avatarIntro.modelUrl) {
    return <ExternalAvatar {...props} />
  }
  return <ProceduralAvatar {...props} />
}
