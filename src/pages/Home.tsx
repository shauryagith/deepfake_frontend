import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Upload, AlertTriangle } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full bg-purple-500/20"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Detect Deepfakes with
              <span className="text-purple-500"> AI Precision</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Protect yourself from digital deception. Our advanced AI technology helps you identify manipulated images and videos with high accuracy.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to="/detection"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center hover:bg-purple-700 transition-colors"
              >
                <Upload className="mr-2" />
                Start Detection
              </Link>
              <Link
                to="/signup"
                className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center hover:bg-gray-700 transition-colors"
              >
                <Shield className="mr-2" />
                Create Account
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 grid md:grid-cols-3 gap-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
              <Shield className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Detection</h3>
              <p className="text-gray-400">State-of-the-art AI algorithms to detect manipulated media with high accuracy.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
              <Upload className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
              <p className="text-gray-400">Simply upload your media and get instant analysis results.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
              <AlertTriangle className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Stay Protected</h3>
              <p className="text-gray-400">Guard against misinformation and digital manipulation.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;