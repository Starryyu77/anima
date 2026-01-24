varying vec2 vUv;
varying vec3 vNormal;
varying float vDisplacement;

uniform float uTime;
uniform float uMood; // -1 to 1
uniform float uEnergy; // 0 to 100

// Traits
uniform float uRationality;
uniform float uSensibility;
uniform float uChaos;

void main() {
  // Base Colors
  vec3 rationalColor = vec3(0.0, 0.95, 1.0); // Cyan
  vec3 sensibleColor = vec3(1.0, 0.0, 0.5); // Magenta
  vec3 chaosColor = vec3(0.1, 1.0, 0.0); // Neon Green
  vec3 neutralColor = vec3(0.1, 0.1, 0.1); // Dark Grey/Black

  // Weight Calculation
  float totalTraits = uRationality + uSensibility + uChaos + 0.1; // +0.1 to avoid div by zero
  float wR = uRationality / totalTraits;
  float wS = uSensibility / totalTraits;
  float wC = uChaos / totalTraits;

  // Mood influence (Mood modulates brightness or adds "heat")
  // -1 (Sad) -> Desaturated, Dark
  // 1 (Happy) -> Bright, Gold tint
  
  vec3 baseColor = neutralColor;
  baseColor = mix(baseColor, rationalColor, wR);
  baseColor = mix(baseColor, sensibleColor, wS);
  baseColor = mix(baseColor, chaosColor, wC);

  // Intensity based on displacement (Peaks are brighter)
  float intensity = smoothstep(-0.2, 0.5, vDisplacement);
  vec3 finalColor = baseColor * (0.5 + intensity);

  // Rim Light (Fresnel)
  vec3 viewDir = vec3(0.0, 0.0, 1.0); // Simplified view dir
  float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.0);
  finalColor += fresnel * baseColor * 2.0;

  // Mood Tint
  if (uMood > 0.0) {
      finalColor += vec3(1.0, 0.8, 0.0) * uMood * 0.2; // Gold glow
  } else {
      finalColor *= (1.0 + uMood * 0.5); // Dim if sad
      if (uMood < -0.5) {
          finalColor += vec3(0.2, 0.0, 0.0) * abs(uMood); // Red if angry/anxious
      }
  }

  // Energy dimming
  float energyFactor = smoothstep(0.0, 20.0, uEnergy);
  finalColor *= (0.2 + 0.8 * energyFactor);

  gl_FragColor = vec4(finalColor, 1.0);
}
