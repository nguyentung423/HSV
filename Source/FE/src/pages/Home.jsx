import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  TreeDeciduous,
  Layers,
  X,
  Link,
  FileVideo,
} from "lucide-react";
import { api } from "../services/api";
import { systemConfig } from "../constants/systems";
import "./Home.css";

/*
 * THE BIOLUMINESCENT TECH-TREE - PERFECT PROPORTIONS
 * ===================================================
 *
 *    [HVS-GATE]                      [HVS-KIOS LITE]
 *         \____                      ____/
 *              \____            ____/
 *                   \__________/
 *                        |
 *                   [HVS-FOOD]
 *                        |
 *                        |
 *                   [HVS-KIOS]
 *                        |
 *                        |
 *                   [HVS-UMEA]
 *                    /  |  \
 *                ~~~~~~~~~~~
 */

// =====================================================
// TREE NODE COMPONENT - Shows choice popup when clicked
// =====================================================
function TreeNode({ system, config, onNavigate, popupPosition = "above" }) {
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useNavigate();
  const IconComponent = config.icon;

  const handleAccess = (e) => {
    e.stopPropagation();
    if (system.appLink) {
      window.open(system.appLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleTutorial = (e) => {
    e.stopPropagation();
    onNavigate(system.id);
  };

  const handleNodeClick = (e) => {
    e.stopPropagation();
    setShowChoices(!showChoices);
  };

  const handleChoiceClick = (type) => {
    navigate(`/video/${system.id}?type=${type}`);
  };

  const handleCloseChoices = (e) => {
    e.stopPropagation();
    setShowChoices(false);
  };

  return (
    <motion.div
      className="tree-node"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      style={{ "--node-color": config.color, "--node-glow": config.glowColor }}
    >
      {/* Glow Effect */}
      <div className="node-glow-ring"></div>

      {/* Main Card - Glassmorphism */}
      <motion.div
        className="node-card"
        onClick={handleNodeClick}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="node-icon">
          <IconComponent size={18} strokeWidth={1.5} />
        </div>
        <h3 className="node-title">{system.name}</h3>
        {system.hasDoc && <span className="doc-badge">DOC</span>}
      </motion.div>

      {/* Video Choice Popup */}
      <AnimatePresence>
        {showChoices && (
          <>
            {/* Backdrop */}
            <motion.div
              className="choice-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseChoices}
            />

            {/* Choice Popup */}
            <motion.div
              className={`video-choice-popup ${popupPosition}`}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: popupPosition === "below" ? -10 : 10,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: popupPosition === "below" ? -10 : 10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="choice-header">
                <span>Chọn loại video</span>
                <button className="close-choice" onClick={handleCloseChoices}>
                  <X size={14} />
                </button>
              </div>

              <div className="choice-options">
                <motion.button
                  className="choice-btn link-choice"
                  onClick={() => handleChoiceClick("link")}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="choice-icon">
                    <Link size={20} />
                  </div>
                  <div className="choice-info">
                    <span className="choice-title">Video Online</span>
                    <span className="choice-desc">Xem video từ YouTube</span>
                  </div>
                  <span className="choice-badge">LINK</span>
                </motion.button>

                <motion.button
                  className="choice-btn mp4-choice"
                  onClick={() => handleChoiceClick("mp4")}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="choice-icon">
                    <FileVideo size={20} />
                  </div>
                  <div className="choice-info">
                    <span className="choice-title">Video Offline</span>
                    <span className="choice-desc">Xem video từ file MP4</span>
                  </div>
                  <span className="choice-badge mp4">MP4</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// SVG Tree Background - REAL TREE (Oak Brown, Green Foliage)
function TreeSVG() {
  return (
    <svg
      className="tree-svg-bg"
      viewBox="-300 -800 1600 1800"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* BARK TEXTURE - Dark Oak to Light Wood */}
        <linearGradient id="barkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="30%" stopColor="#4E342E" />
          <stop offset="60%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#795548" />
        </linearGradient>

        {/* Root gradient - darker brown */}
        <linearGradient id="rootBarkGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3E2723" />
          <stop offset="100%" stopColor="#1B0F0A" />
        </linearGradient>

        {/* Branch gradient - lighter brown tips */}
        <linearGradient id="branchBarkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5D4037" />
          <stop offset="100%" stopColor="#8D6E63" />
        </linearGradient>

        {/* === PREMIUM VOLUMETRIC CANOPY GRADIENTS === */}

        {/* Main Dome Gradient - Sunlit center at apex of HUGE dome */}
        <radialGradient
          id="canopyDome"
          cx="50%"
          cy="15%"
          r="80%"
          fx="50%"
          fy="10%"
        >
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="15%" stopColor="#66BB6A" />
          <stop offset="40%" stopColor="#43A047" />
          <stop offset="65%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>

        {/* Left Wing Gradient - Light comes from top-center */}
        <radialGradient
          id="canopyLeft"
          cx="70%"
          cy="15%"
          r="90%"
          fx="65%"
          fy="10%"
        >
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="20%" stopColor="#66BB6A" />
          <stop offset="50%" stopColor="#4CAF50" />
          <stop offset="75%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>

        {/* Right Wing Gradient - Mirror of left */}
        <radialGradient
          id="canopyRight"
          cx="30%"
          cy="15%"
          r="90%"
          fx="35%"
          fy="10%"
        >
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="20%" stopColor="#66BB6A" />
          <stop offset="50%" stopColor="#4CAF50" />
          <stop offset="75%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>

        {/* Top Crown Highlight - Brightest sun-catching area at apex */}
        <radialGradient id="canopyHighlight" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#C5E1A5" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#AED581" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#8BC34A" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7CB342" stopOpacity="0" />
        </radialGradient>

        {/* Ambient Shadow - Soft depth underneath */}
        <radialGradient id="canopyShadow" cx="50%" cy="10%" r="85%">
          <stop offset="0%" stopColor="#1B5E20" stopOpacity="0.15" />
          <stop offset="45%" stopColor="#0D3B13" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0A2E10" stopOpacity="0.75" />
        </radialGradient>

        {/* Soft edge blur for premium finish */}
        <filter id="canopySoftEdge" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>

        {/* Ground gradient - earth tones */}
        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#2D1B0E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1A0F08" stopOpacity="0.8" />
        </linearGradient>

        {/* Soft shadow filter for depth */}
        <filter id="treeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="3"
            dy="5"
            stdDeviation="4"
            floodColor="#000"
            floodOpacity="0.3"
          />
        </filter>

        {/* Bark texture pattern */}
        <pattern
          id="barkTexture"
          patternUnits="userSpaceOnUse"
          width="20"
          height="30"
        >
          <rect width="20" height="30" fill="#5D4037" />
          <path
            d="M0 5 Q5 3, 10 6 T20 5"
            stroke="#4E342E"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M0 15 Q5 13, 10 16 T20 15"
            stroke="#4E342E"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M0 25 Q5 23, 10 26 T20 25"
            stroke="#3E2723"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </pattern>
      </defs>

      {/* ============================================================
          ULTRA-WIDE BANYAN TREE CANOPY - Giant Umbrella Shape
          Cards are "fruits" completely ENGULFED inside the green mass
          NOW POSITIONED HIGHER for tall majestic tree
          ============================================================ */}
      <g className="foliage-canopy">
        {/* === LAYER 1: Outer Shadow Halo (MASSIVE horizontal reach) === */}
        <motion.path
          d="M 500 100
             C 200 100, -100 50, -250 -50
             C -400 -150, -450 -300, -420 -450
             C -390 -600, -280 -680, -100 -730
             C 120 -780, 300 -790, 500 -790
             C 700 -790, 880 -780, 1100 -730
             C 1280 -680, 1390 -600, 1420 -450
             C 1450 -300, 1400 -150, 1250 -50
             C 1100 50, 800 100, 500 100
             Z"
          fill="url(#canopyShadow)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.2 }}
        />

        {/* === LAYER 2: Main ULTRA-WIDE Dome (Completely covers card area) === */}
        <motion.path
          d="M 500 80
             C 220 80, -50 30, -200 -70
             C -350 -170, -400 -320, -370 -480
             C -340 -640, -220 -710, -50 -750
             C 180 -790, 340 -800, 500 -800
             C 660 -800, 820 -790, 1050 -750
             C 1220 -710, 1340 -640, 1370 -480
             C 1400 -320, 1350 -170, 1200 -70
             C 1050 30, 780 80, 500 80
             Z"
          fill="url(#canopyDome)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, delay: 2.4 }}
        />

        {/* === LAYER 3: Left Wing Extension (FAR LEFT - beyond left card) === */}
        <motion.path
          d="M 100 0
             C -50 20, -200 0, -300 -100
             C -400 -200, -440 -350, -400 -500
             C -360 -650, -260 -720, -100 -740
             C 60 -760, 200 -720, 280 -640
             C 360 -560, 340 -420, 300 -280
             C 260 -140, 200 -40, 100 0
             Z"
          fill="url(#canopyLeft)"
          initial={{ scale: 0, opacity: 0, x: -30 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 2.6 }}
        />

        {/* === LAYER 4: Right Wing Extension (FAR RIGHT - beyond right card) === */}
        <motion.path
          d="M 900 0
             C 1050 20, 1200 0, 1300 -100
             C 1400 -200, 1440 -350, 1400 -500
             C 1360 -650, 1260 -720, 1100 -740
             C 940 -760, 800 -720, 720 -640
             C 640 -560, 660 -420, 700 -280
             C 740 -140, 800 -40, 900 0
             Z"
          fill="url(#canopyRight)"
          initial={{ scale: 0, opacity: 0, x: 30 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 2.6 }}
        />

        {/* === LAYER 5: Upper Crown Bulge (Volume at top - WIDE) === */}
        <motion.path
          d="M 500 -450
             C 280 -450, 80 -500, -50 -580
             C -180 -660, -200 -720, -100 -760
             C 50 -800, 280 -810, 500 -810
             C 720 -810, 950 -800, 1100 -760
             C 1200 -720, 1180 -660, 1050 -580
             C 920 -500, 720 -450, 500 -450
             Z"
          fill="url(#canopyDome)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1, delay: 2.7 }}
        />

        {/* === LAYER 6: Crown Apex Highlight (Top of the dome - WIDE) === */}
        <motion.path
          d="M 500 -620
             C 350 -620, 200 -650, 100 -700
             C 0 -750, 50 -780, 200 -795
             C 350 -810, 420 -815, 500 -815
             C 580 -815, 650 -810, 800 -795
             C 950 -780, 1000 -750, 900 -700
             C 800 -650, 650 -620, 500 -620
             Z"
          fill="url(#canopyHighlight)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.9 }}
        />

        {/* === LAYER 7: Left Mid Highlight (FAR LEFT - catches light) === */}
        <motion.path
          d="M -50 -350
             C -150 -380, -250 -460, -230 -560
             C -210 -660, -100 -700, 20 -670
             C 140 -640, 200 -560, 160 -460
             C 120 -360, 50 -330, -50 -350
             Z"
          fill="url(#canopyHighlight)"
          opacity="0.7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        />

        {/* === LAYER 8: Right Mid Highlight (FAR RIGHT - catches light) === */}
        <motion.path
          d="M 1050 -350
             C 1150 -380, 1250 -460, 1230 -560
             C 1210 -660, 1100 -700, 980 -670
             C 860 -640, 800 -560, 840 -460
             C 880 -360, 950 -330, 1050 -350
             Z"
          fill="url(#canopyHighlight)"
          opacity="0.7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        />

        {/* === Soft ambient glow around the ULTRA-WIDE crown === */}
        <motion.ellipse
          cx="500"
          cy="-450"
          rx="800"
          ry="420"
          fill="none"
          stroke="url(#canopyHighlight)"
          strokeWidth="60"
          filter="url(#canopySoftEdge)"
          opacity="0.2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 3.2 }}
        />
      </g>

      {/* === GROUND / SOIL at bottom === */}
      <rect
        x="-200"
        y="920"
        width="1400"
        height="100"
        fill="url(#groundGrad)"
      />

      {/* === ROOTS (MASSIVE thick roots at new lower position) === */}
      <g className="roots-group" filter="url(#treeShadow)">
        {/* Main left root - EXTRA THICK and spreading */}
        <motion.path
          d="M 500 900 
             C 450 940, 350 980, 200 1000
             C 80 1018, -40 1000, -120 960
             C -160 940, -200 910, -220 880"
          fill="none"
          stroke="url(#rootBarkGrad)"
          strokeWidth="65"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />

        {/* Main right root - EXTRA THICK */}
        <motion.path
          d="M 500 900 
             C 550 940, 650 980, 800 1000
             C 920 1018, 1040 1000, 1120 960
             C 1160 940, 1200 910, 1220 880"
          fill="none"
          stroke="url(#rootBarkGrad)"
          strokeWidth="65"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Center deep root - THICK */}
        <motion.path
          d="M 500 900 C 500 960, 505 1020, 500 1080"
          fill="none"
          stroke="url(#rootBarkGrad)"
          strokeWidth="55"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Secondary root tendrils - thicker */}
        <motion.path
          d="M 360 950 C 280 990, 200 1030, 160 1090"
          fill="none"
          stroke="url(#rootBarkGrad)"
          strokeWidth="35"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.path
          d="M 640 950 C 720 990, 800 1030, 840 1090"
          fill="none"
          stroke="url(#rootBarkGrad)"
          strokeWidth="35"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Small root details - thicker */}
        <motion.path
          d="M 440 940 C 380 980, 320 1030, 280 1080"
          fill="none"
          stroke="#3E2723"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        <motion.path
          d="M 560 940 C 620 980, 680 1030, 720 1080"
          fill="none"
          stroke="#3E2723"
          strokeWidth="20"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      </g>

      {/* === MAIN TRUNK (TALL MAJESTIC ancient oak) === */}
      <g className="trunk-group" filter="url(#treeShadow)">
        {/* Main trunk - VERY TALL with gentle taper */}
        <motion.path
          d="M 500 900
             C 485 800, 475 700, 490 600
             C 510 500, 490 400, 500 300
             C 510 200, 490 100, 500 0
             C 510 -100, 495 -150, 500 -200"
          fill="none"
          stroke="url(#barkGrad)"
          strokeWidth="140"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.8 }}
        />

        {/* Bark texture overlay - lighter streaks */}
        <motion.path
          d="M 475 900
             C 462 800, 455 700, 468 600
             C 485 500, 462 400, 472 300
             C 485 200, 465 100, 475 0
             C 488 -100, 470 -150, 478 -200"
          fill="none"
          stroke="rgba(139, 119, 101, 0.35)"
          strokeWidth="30"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1 }}
        />

        {/* Dark bark detail */}
        <motion.path
          d="M 525 900
             C 540 800, 545 700, 530 600
             C 512 500, 538 400, 525 300
             C 512 200, 535 100, 522 0
             C 510 -100, 530 -150, 522 -200"
          fill="none"
          stroke="rgba(62, 39, 35, 0.45)"
          strokeWidth="22"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.1 }}
        />

        {/* Knobby texture spots along the tall trunk */}
        <motion.circle
          cx="490"
          cy="700"
          r="20"
          fill="#4E342E"
          opacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
        />
        <motion.circle
          cx="515"
          cy="500"
          r="16"
          fill="#3E2723"
          opacity="0.4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6 }}
        />
        <motion.circle
          cx="485"
          cy="300"
          r="18"
          fill="#4E342E"
          opacity="0.45"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.7 }}
        />
        <motion.circle
          cx="510"
          cy="100"
          r="14"
          fill="#3E2723"
          opacity="0.4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.circle
          cx="495"
          cy="-50"
          r="12"
          fill="#4E342E"
          opacity="0.35"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.9 }}
        />
      </g>

      {/* === BRANCHES (Graceful upward curves to hold high canopy) === */}
      <g className="branches-group" filter="url(#treeShadow)">
        {/* Left main branch - curves UP and outward to left */}
        <motion.path
          d="M 500 -180
             C 420 -220, 300 -280, 150 -350
             C 50 -400, -50 -420, -150 -380"
          fill="none"
          stroke="url(#branchBarkGrad)"
          strokeWidth="70"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.2 }}
        />

        {/* Right main branch - curves UP and outward to right */}
        <motion.path
          d="M 500 -180
             C 580 -220, 700 -280, 850 -350
             C 950 -400, 1050 -420, 1150 -380"
          fill="none"
          stroke="url(#branchBarkGrad)"
          strokeWidth="70"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.4 }}
        />

        {/* Secondary branches - higher up */}
        <motion.path
          d="M 150 -350 C 50 -400, -30 -450, -100 -430"
          fill="none"
          stroke="#8D6E63"
          strokeWidth="32"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 3.3 }}
        />
        <motion.path
          d="M 850 -350 C 950 -400, 1030 -450, 1100 -430"
          fill="none"
          stroke="#8D6E63"
          strokeWidth="32"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 3.4 }}
        />

        {/* Small twigs reaching into canopy */}
        <motion.path
          d="M 280 -300 C 220 -350, 160 -420, 120 -480"
          fill="none"
          stroke="#A1887F"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.5 }}
        />
        <motion.path
          d="M 720 -300 C 780 -350, 840 -420, 880 -480"
          fill="none"
          stroke="#A1887F"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 3.6 }}
        />
      </g>

      {/* === FOREGROUND SOFT ACCENTS (Subtle depth in front of branches) === */}
      <g className="foreground-leaves">
        {/* Left side soft glow - behind cards but adds depth */}
        <motion.ellipse
          cx="140"
          cy="130"
          rx="80"
          ry="50"
          fill="url(#canopyHighlight)"
          opacity="0.4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 3.5 }}
        />

        {/* Right side soft glow */}
        <motion.ellipse
          cx="860"
          cy="130"
          rx="80"
          ry="50"
          fill="url(#canopyHighlight)"
          opacity="0.4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 3.5 }}
        />
      </g>

      {/* === FALLING LEAVES (Smooth animated particles) === */}
      <g className="falling-leaves">
        <motion.ellipse
          rx="4"
          ry="2"
          fill="#66BB6A"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [200, 230, 280],
            y: [50, 150, 300],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 4 }}
        />
        <motion.ellipse
          rx="3"
          ry="1.5"
          fill="#81C784"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            x: [750, 720, 680],
            y: [60, 180, 350],
            rotate: [0, -180, -360],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 5 }}
        />
        <motion.ellipse
          rx="3.5"
          ry="2"
          fill="#4CAF50"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            x: [500, 520, 550],
            y: [80, 200, 380],
            rotate: [0, 120, 240],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 3 }}
        />
      </g>
    </svg>
  );
}

function Home() {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadSystems();
  }, []);

  const loadSystems = async () => {
    const data = await api.getSystems();
    setSystems(data);
    setLoading(false);
  };

  const handleNavigate = (systemId) => {
    navigate(`/video/${systemId}?type=link`);
  };

  const getSystem = (id) => systems.find((s) => s.id === id);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Layers size={48} className="loading-icon" />
          </motion.div>
          <p>Đang kết nối...</p>
        </div>
      </div>
    );
  }

  const umea = getSystem("hvs-umea");
  const kios = getSystem("hvs-kios");
  const food = getSystem("hvs-food");
  const gate = getSystem("hvs-gate");
  const kiosLite = getSystem("hvs-kios-lite");

  return (
    <div className="home-container">
      {/* Deep Forest Background */}
      <div className="forest-bg">
        <div className="bg-gradient-layer"></div>
        <div className="bg-noise"></div>
        <div className="ambient-glow glow-top"></div>
        <div className="ambient-glow glow-bottom"></div>
      </div>

      {/* Header */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-brand">
          <TreeDeciduous size={32} className="brand-icon" />
          <div className="brand-text">
            <h1>HVS ECOSYSTEM</h1>
            <span>The Living Platform</span>
          </div>
        </div>
      </motion.header>

      {/* Main Tree Container */}
      <main className="tree-main">
        <div className="tree-container">
          {/* SVG Tree as Background Layer (z-0) */}
          <TreeSVG />

          {/* HTML Cards Layer (z-10) - Flex Column Layout */}
          <div className="cards-layer">
            {/* TOP ROW: Branches - Wide apart */}
            <div className="branch-row">
              {/* Left Branch - HVS-GATE */}
              {gate && (
                <motion.div
                  className="branch-node left"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3, duration: 0.8 }}
                >
                  <TreeNode
                    system={gate}
                    config={systemConfig["hvs-gate"]}
                    onNavigate={handleNavigate}
                    popupPosition="below"
                  />
                </motion.div>
              )}

              {/* Right Branch - HVS-KIOS LITE */}
              {kiosLite && (
                <motion.div
                  className="branch-node right"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.2, duration: 0.8 }}
                >
                  <TreeNode
                    system={kiosLite}
                    config={systemConfig["hvs-kios-lite"]}
                    onNavigate={handleNavigate}
                    popupPosition="below"
                  />
                </motion.div>
              )}
            </div>

            {/* TRUNK NODES: Stacked vertically with generous spacing */}
            <div className="trunk-column">
              {/* Upper Trunk - HVS-FOOD */}
              {food && (
                <motion.div
                  className="trunk-node"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.3, duration: 0.8 }}
                >
                  <TreeNode
                    system={food}
                    config={systemConfig["hvs-food"]}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              )}

              {/* Lower Trunk - HVS-KIOS */}
              {kios && (
                <motion.div
                  className="trunk-node"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.8 }}
                >
                  <TreeNode
                    system={kios}
                    config={systemConfig["hvs-kios"]}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              )}

              {/* Roots - HVS-UMEA */}
              {umea && (
                <motion.div
                  className="trunk-node root-node"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  <TreeNode
                    system={umea}
                    config={systemConfig["hvs-umea"]}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <p>Nhấn vào node để xem video hướng dẫn</p>
      </motion.footer>
    </div>
  );
}

export default Home;
