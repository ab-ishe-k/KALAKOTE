import { useState, useEffect, useRef, useCallback } from 'react';

export interface DeviceMotionState {
  // Normalized motion coordinates [-1, 1]
  x: number;
  y: number;
  // Raw orientation values if available
  beta: number;  // front-to-back tilt [-180, 180]
  gamma: number; // left-to-right tilt [-90, 90]
  isMobile: boolean;
  isSensorActive: boolean;
  permissionGranted: boolean;
  requiresPermissionPrompt: boolean;
  requestPermission: () => Promise<boolean>;
}

export const useDeviceMotion = (): DeviceMotionState => {
  const [motion, setMotion] = useState<{ x: number; y: number; beta: number; gamma: number }>({
    x: 0,
    y: 0,
    beta: 0,
    gamma: 0
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSensorActive, setIsSensorActive] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [requiresPermissionPrompt, setRequiresPermissionPrompt] = useState<boolean>(false);

  // Target coordinates for smooth lerping
  const targetRef = useRef<{ x: number; y: number; beta: number; gamma: number }>({
    x: 0,
    y: 0,
    beta: 0,
    gamma: 0
  });

  // Current interpolated values
  const currentRef = useRef<{ x: number; y: number; beta: number; gamma: number }>({
    x: 0,
    y: 0,
    beta: 0,
    gamma: 0
  });

  // Check if iOS DeviceOrientation requires user permission
  useEffect(() => {
    const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);

    if (
      typeof window !== 'undefined' &&
      typeof (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent !== 'undefined' &&
      typeof (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent?.requestPermission === 'function'
    ) {
      setRequiresPermissionPrompt(true);
    } else if (isMobileDevice) {
      // Android / browsers without permission prompt requirement
      setPermissionGranted(true);
    }
  }, []);

  // Request permission explicitly (for iOS Safari)
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const DeviceOrientationEventAny = (window as unknown as {
        DeviceOrientationEvent?: { requestPermission?: () => Promise<'granted' | 'denied'> };
      }).DeviceOrientationEvent;

      if (typeof DeviceOrientationEventAny?.requestPermission === 'function') {
        const response = await DeviceOrientationEventAny.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setRequiresPermissionPrompt(false);
          return true;
        }
        return false;
      }
      setPermissionGranted(true);
      return true;
    } catch (err) {
      console.warn('DeviceOrientation permission request failed:', err);
      return false;
    }
  }, []);

  // Physical Gyroscope event listener
  useEffect(() => {
    if (!isMobile && !permissionGranted) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      setIsSensorActive(true);

      // Clamp values and normalize:
      // Beta (pitch): typical phone hand-held angle is around 45°
      // Normalized: deviation from 45 degrees
      const clampedBeta = Math.max(-45, Math.min(45, (e.beta || 0) - 45));
      const clampedGamma = Math.max(-45, Math.min(45, e.gamma || 0));

      targetRef.current.beta = e.beta || 0;
      targetRef.current.gamma = e.gamma || 0;
      targetRef.current.x = clampedGamma / 45; // -1 to 1 (left to right tilt)
      targetRef.current.y = clampedBeta / 45;  // -1 to 1 (forward to back tilt)
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isMobile, permissionGranted]);

  // Desktop Virtual Sensor: Pointer/Mouse tracking
  useEffect(() => {
    if (isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      setIsSensorActive(true);
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;

      // Normalize to [-1, 1]
      const nx = Math.max(-1, Math.min(1, (e.clientX - halfWidth) / halfWidth));
      const ny = Math.max(-1, Math.min(1, (e.clientY - halfHeight) / halfHeight));

      targetRef.current.x = nx;
      targetRef.current.y = ny;
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isMobile]);

  // High-performance RAF lerp loop (60fps smooth momentum)
  useEffect(() => {
    let animId: number;
    const lerpFactor = 0.08; // Buttery smooth motion factor

    const updateLoop = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;

      cur.x += (tgt.x - cur.x) * lerpFactor;
      cur.y += (tgt.y - cur.y) * lerpFactor;
      cur.beta += (tgt.beta - cur.beta) * lerpFactor;
      cur.gamma += (tgt.gamma - cur.gamma) * lerpFactor;

      setMotion({
        x: cur.x,
        y: cur.y,
        beta: cur.beta,
        gamma: cur.gamma
      });

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return {
    ...motion,
    isMobile,
    isSensorActive,
    permissionGranted,
    requiresPermissionPrompt,
    requestPermission
  };
};

