import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * FloatingParticles Component
 * Creates animated emoji particles that float upward across the screen
 * Perfect for adding life to hero sections and special moments
 */
function FloatingParticles({
  emojis = ['🎉', '🎂', '💕', '🎊', '✨'],
  count = 20,
  speed = 'normal',
  enabled = true
}) {
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const initialized = useRef(false);

  useEffect(() => {
    // Detect mobile for performance optimization
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(prev => prev !== mobile ? mobile : prev); // Only update if changed
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (initialized.current) return;
    initialized.current = true;

    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? Math.floor(count / 2) : count;

    // Generate random particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100, // Random horizontal position (%)
      size: isMobile ? 1.5 + Math.random() * 1 : 2 + Math.random() * 2, // Font size (rem)
      duration: getDuration(speed), // Animation duration
      delay: Math.random() * 10, // Start delay (s)
      drift: (Math.random() - 0.5) * 100, // Horizontal drift (px)
    }));

    setParticles(newParticles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to get animation duration based on speed
  const getDuration = (speedType) => {
    const baseSpeed = 15;
    const variance = Math.random() * 10; // Add randomness

    switch (speedType) {
      case 'slow':
        return baseSpeed + variance + 10;
      case 'fast':
        return baseSpeed + variance - 5;
      default:
        return baseSpeed + variance;
    }
  };

  if (!enabled) return null;

  return (
    <div
      className="floating-particles-container"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            '--particle-left': `${particle.left}%`,
            '--particle-size': `${particle.size}rem`,
            '--particle-duration': `${particle.duration}s`,
            '--particle-delay': `${particle.delay}s`,
            '--drift': `${particle.drift}px`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}

FloatingParticles.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  speed: PropTypes.oneOf(['slow', 'normal', 'fast']),
  enabled: PropTypes.bool,
};

export default FloatingParticles;
