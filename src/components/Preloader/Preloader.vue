<template>
  <div class="preloader-wrap">
    <svg viewBox="0 0 100 20" class="svg-scale">
      <defs>
        <linearGradient id="gradient">
          <stop color="#000"/>
        </linearGradient>
        <pattern id="wave" x="0" y="-0.5" width="100%" height="100%" patternUnits="userSpaceOnUse">
          <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)">
            <animateTransform
             attributeName="transform"
             begin="0s"
             dur="1.5s"
             type="translate"
             from="0,0"
             to="40,0"
             repeatCount="indefinite" />
          </path>
        </pattern>
      </defs>
      <g transform="scale(0.5) translate(55, 0)">
        <text text-anchor="middle" x="50" y="17" font-size="17" fill="white" fill-opacity="0.1">SHOPPING</text>
        <text text-anchor="middle" x="50" y="17" font-size="17" fill="url(#wave)" fill-opacity="1">SHOPPING</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
</script>

<style scoped>
.preloader-wrap {
  position: fixed;
  z-index: 15000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  font-weight: bold;
  max-width: 100%;
  height: auto;
}
</style>
