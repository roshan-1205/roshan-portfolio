import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface WhiteBallRobotProps {
  speaking: boolean
}

const SUIT = "#ececef"
const SUIT_SHADOW = "#c8c8d0"
const SKIN = "#c8956c"
const SKIN_LIGHT = "#dbac82"
const HAIR = "#1a1208"
const EYE_WHITE = "#f5f5f5"
const IRIS = "#3d2817"
const LIP = "#b06b55"
const JOINT = "#2a2a34"

function HumanHand({ side }: { side: "left" | "right" }) {
  const sign = side === "left" ? -1 : 1
  const fingers = [-0.028, 0, 0.028, 0.056]

  return (
    <group position={[0, -0.34, 0.02]} rotation={[0.15, 0, sign * 0.08]}>
      <mesh scale={[0.85, 0.55, 0.35]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.62} />
      </mesh>
      {fingers.map((x, i) => (
        <group key={i} position={[sign * x, -0.06, 0.01]}>
          <mesh position={[0, -0.04, 0]}>
            <capsuleGeometry args={[0.014, 0.05, 4, 8]} />
            <meshStandardMaterial color={SKIN} roughness={0.62} />
          </mesh>
          <mesh position={[0, -0.085, 0.01]}>
            <sphereGeometry args={[0.014, 8, 8]} />
            <meshStandardMaterial color={SKIN_LIGHT} roughness={0.55} />
          </mesh>
        </group>
      ))}
      <mesh position={[sign * -0.06, -0.02, 0.03]} rotation={[0, 0, sign * 0.7]}>
        <capsuleGeometry args={[0.016, 0.045, 4, 8]} />
        <meshStandardMaterial color={SKIN} roughness={0.62} />
      </mesh>
    </group>
  )
}

function HumanEye({ x, speaking }: { x: number; speaking: boolean }) {
  const lid = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!lid.current) return
    const blink = Math.sin(state.clock.elapsedTime * 0.35 + x * 10)
    const blinkScale = blink > 0.97 ? 0.15 : 1
    lid.current.scale.y = THREE.MathUtils.lerp(lid.current.scale.y, blinkScale, 0.35)
  })

  return (
    <group position={[x, 0.06, 0.36]}>
      <mesh scale={[1.1, 0.75, 0.3]}>
        <sphereGeometry args={[0.075, 20, 20]} />
        <meshStandardMaterial color={EYE_WHITE} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.02]} scale={[0.55, 0.7, 0.35]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color={IRIS} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial color="#050505" roughness={0.2} />
      </mesh>
      <mesh position={[0.02, 0.02, 0.04]} scale={0.35}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={speaking ? 0.6 : 0.25}
        />
      </mesh>
      <mesh ref={lid} position={[0, 0.04, 0.038]} scale={[1.15, 1, 0.4]}>
        <sphereGeometry args={[0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={SKIN} roughness={0.55} />
      </mesh>
    </group>
  )
}

export function WhiteBallRobot({ speaking }: WhiteBallRobotProps) {
  const root = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const chest = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Group>(null)
  const rightLeg = useRef<THREE.Group>(null)
  const jaw = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (root.current) {
      root.current.position.y = Math.sin(t * 1.1) * (speaking ? 0.02 : 0.008)
    }

    if (chest.current) {
      const breath = Math.sin(t * (speaking ? 2.8 : 1.4)) * (speaking ? 0.018 : 0.008)
      chest.current.scale.set(1 + breath, 1 + breath * 1.5, 1 + breath * 0.5)
      chest.current.rotation.x = speaking ? -0.04 + Math.sin(t * 1.6) * 0.03 : 0
    }

    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.7) * (speaking ? 0.14 : 0.05)
      head.current.rotation.x = speaking ? Math.sin(t * 2.2) * 0.06 - 0.02 : 0
      head.current.rotation.z = Math.sin(t * 1.1) * 0.02
    }

    if (jaw.current) {
      const talk = speaking ? Math.abs(Math.sin(t * 12)) * 0.12 : 0
      jaw.current.position.y = -0.2 - talk
    }

    if (leftArm.current) {
      leftArm.current.rotation.z = 0.12 + Math.sin(t * (speaking ? 2.4 : 0.9)) * (speaking ? 0.18 : 0.06)
      leftArm.current.rotation.x = speaking ? Math.sin(t * 2.1) * 0.22 - 0.1 : -0.05
    }
    if (rightArm.current) {
      rightArm.current.rotation.z = -0.12 - Math.sin(t * (speaking ? 2.4 : 0.9)) * (speaking ? 0.18 : 0.06)
      rightArm.current.rotation.x = speaking ? Math.sin(t * 2.1 + Math.PI) * 0.18 - 0.08 : -0.04
    }

    if (leftLeg.current) {
      leftLeg.current.rotation.x = Math.sin(t * (speaking ? 1.8 : 0.7)) * (speaking ? 0.08 : 0.03)
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.x = Math.sin(t * (speaking ? 1.8 : 0.7) + Math.PI) * (speaking ? 0.08 : 0.03)
    }
  })

  return (
    <group ref={root} position={[0, -0.72, 0]} scale={1.08}>
      <group ref={head} position={[0, 1.48, 0]}>
        <mesh position={[0, 0.08, -0.02]} scale={[0.88, 1.05, 0.92]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial color={SKIN} roughness={0.58} />
        </mesh>
        <mesh position={[0, -0.12, 0.02]} scale={[0.78, 0.72, 0.82]}>
          <sphereGeometry args={[0.28, 28, 28]} />
          <meshStandardMaterial color={SKIN} roughness={0.58} />
        </mesh>

        <mesh position={[0, 0.28, -0.02]}>
          <sphereGeometry args={[0.36, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={HAIR} roughness={0.82} />
        </mesh>

        <mesh position={[0, 0.02, 0.33]} scale={[0.18, 0.12, 0.2]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={SKIN_LIGHT} roughness={0.55} />
        </mesh>

        <HumanEye x={-0.11} speaking={speaking} />
        <HumanEye x={0.11} speaking={speaking} />

        <mesh position={[-0.11, 0.2, 0.32]} rotation={[0, 0, 0.15]} scale={[1.4, 0.25, 0.2]}>
          <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.8} />
        </mesh>
        <mesh position={[0.11, 0.2, 0.32]} rotation={[0, 0, -0.15]} scale={[1.4, 0.25, 0.2]}>
          <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
          <meshStandardMaterial color={HAIR} roughness={0.8} />
        </mesh>

        <mesh ref={jaw} position={[0, -0.2, 0.3]} scale={[0.55, 0.18, 0.25]}>
          <sphereGeometry args={[0.1, 16, 12]} />
          <meshStandardMaterial color={LIP} roughness={0.45} />
        </mesh>
      </group>

      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.16, 16]} />
        <meshStandardMaterial color={SKIN} roughness={0.55} />
      </mesh>

      <group ref={chest} position={[0, 0.72, 0]}>
        <mesh position={[0, 0.1, 0]} scale={[1.1, 1.15, 0.75]}>
          <capsuleGeometry args={[0.28, 0.42, 12, 24]} />
          <meshStandardMaterial color={SUIT} roughness={0.48} metalness={0.12} />
        </mesh>
        <mesh position={[0, -0.18, 0.02]} scale={[0.82, 0.9, 0.7]}>
          <capsuleGeometry args={[0.24, 0.2, 10, 20]} />
          <meshStandardMaterial color={SUIT} roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.02, 0.2]}>
          <boxGeometry args={[0.08, 0.28, 0.02]} />
          <meshStandardMaterial color={SUIT_SHADOW} metalness={0.35} roughness={0.35} />
        </mesh>
      </group>

      <group ref={leftArm} position={[-0.42, 0.88, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.085, 0.2, 8, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.48} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={JOINT} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]}>
          <capsuleGeometry args={[0.07, 0.22, 8, 16]} />
          <meshStandardMaterial color={SUIT_SHADOW} roughness={0.5} />
        </mesh>
        <HumanHand side="left" />
      </group>

      <group ref={rightArm} position={[0.42, 0.88, 0]}>
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.085, 0.2, 8, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.48} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={JOINT} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.28, 0.02]}>
          <capsuleGeometry args={[0.07, 0.22, 8, 16]} />
          <meshStandardMaterial color={SUIT_SHADOW} roughness={0.5} />
        </mesh>
        <HumanHand side="right" />
      </group>

      <group ref={leftLeg} position={[-0.16, 0.18, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.48, 0.03]}>
          <capsuleGeometry args={[0.085, 0.3, 8, 16]} />
          <meshStandardMaterial color={SUIT_SHADOW} roughness={0.52} />
        </mesh>
        <mesh position={[0, -0.72, 0.08]} scale={[1.1, 0.45, 1.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#1e1e28" roughness={0.4} metalness={0.55} />
        </mesh>
      </group>

      <group ref={rightLeg} position={[0.16, 0.18, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
          <meshStandardMaterial color={SUIT} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.48, 0.03]}>
          <capsuleGeometry args={[0.085, 0.3, 8, 16]} />
          <meshStandardMaterial color={SUIT_SHADOW} roughness={0.52} />
        </mesh>
        <mesh position={[0, -0.72, 0.08]} scale={[1.1, 0.45, 1.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#1e1e28" roughness={0.4} metalness={0.55} />
        </mesh>
      </group>
    </group>
  )
}
