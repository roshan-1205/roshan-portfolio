import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

interface CuteBlackRobotProps {
  running: boolean
  speaking: boolean
}

const BODY = "#14141c"
const BODY_LIGHT = "#22222e"
const EYE = "#00d4ff"

export function CuteBlackRobot({ running, speaking }: CuteBlackRobotProps) {
  const root = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Group>(null)
  const rightLeg = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const speed = speaking ? 10 : running ? 6 : 2
    const phase = t * speed
    const stride = speaking ? 0.75 : running ? 0.55 : 0.15
    const bounce = speaking ? 0.09 : running ? 0.06 : 0.02

    if (root.current) {
      root.current.position.y = Math.abs(Math.sin(phase * 2)) * bounce - 0.55
      root.current.rotation.z = Math.sin(phase) * (speaking ? 0.06 : 0.03)
    }

    if (body.current) {
      body.current.rotation.x = speaking ? -0.12 : running ? -0.06 : 0
    }

    if (leftLeg.current) {
      leftLeg.current.rotation.x = Math.sin(phase) * stride
    }
    if (rightLeg.current) {
      rightLeg.current.rotation.x = Math.sin(phase + Math.PI) * stride
    }
    if (leftArm.current) {
      leftArm.current.rotation.x = Math.sin(phase + Math.PI) * (stride * 0.7)
    }
    if (rightArm.current) {
      rightArm.current.rotation.x = Math.sin(phase) * (stride * 0.7)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.15}>
      <group ref={root} scale={1.15}>
        <group ref={body} position={[0, 0.35, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.52, 32, 32]} />
            <meshStandardMaterial
              color={BODY}
              roughness={0.35}
              metalness={0.55}
            />
          </mesh>

          <mesh position={[0, -0.28, 0.05]} scale={[0.82, 0.95, 0.72]}>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshStandardMaterial
              color={BODY}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>

          <mesh position={[0, 0.22, 0.38]}>
            <sphereGeometry args={[0.14, 24, 24]} />
            <meshStandardMaterial
              color={EYE}
              emissive={EYE}
              emissiveIntensity={speaking ? 1.4 : 0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0.22, 0.2, 0.37]}>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color={EYE}
              emissive={EYE}
              emissiveIntensity={speaking ? 1.4 : 0.9}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[-0.22, 0.2, 0.37]}>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color={EYE}
              emissive={EYE}
              emissiveIntensity={speaking ? 1.4 : 0.9}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0, 0.52, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={BODY_LIGHT}
              metalness={0.7}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial
              color={EYE}
              emissive={EYE}
              emissiveIntensity={1}
            />
          </mesh>
        </group>

        <group ref={leftArm} position={[-0.48, 0.22, 0]}>
          <mesh position={[0, -0.12, 0]} rotation={[0, 0, 0.25]}>
            <capsuleGeometry args={[0.07, 0.2, 6, 12]} />
            <meshStandardMaterial color={BODY_LIGHT} metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.48, 0.22, 0]}>
          <mesh position={[0, -0.12, 0]} rotation={[0, 0, -0.25]}>
            <capsuleGeometry args={[0.07, 0.2, 6, 12]} />
            <meshStandardMaterial color={BODY_LIGHT} metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        <group ref={leftLeg} position={[-0.2, -0.05, 0]}>
          <mesh position={[0, -0.18, 0.04]}>
            <capsuleGeometry args={[0.09, 0.18, 6, 12]} />
            <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.36, 0.1]} scale={[1.1, 0.5, 1.3]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={BODY_LIGHT} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
        <group ref={rightLeg} position={[0.2, -0.05, 0]}>
          <mesh position={[0, -0.18, 0.04]}>
            <capsuleGeometry args={[0.09, 0.18, 6, 12]} />
            <meshStandardMaterial color={BODY} metalness={0.55} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.36, 0.1]} scale={[1.1, 0.5, 1.3]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={BODY_LIGHT} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>

        <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.75, 48]} />
          <meshStandardMaterial
            color={EYE}
            emissive={EYE}
            emissiveIntensity={0.25}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  )
}
