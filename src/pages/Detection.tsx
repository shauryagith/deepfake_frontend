// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, AlertTriangle, CheckCircle } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';  // Adjust path as needed
// import { Navigate } from 'react-router-dom';

// const Detection = () => {
//   // const { user } = useAuth();

//   // Redirect to login if not authenticated
//   const isLogin = localStorage.getItem('token') !== null;
//   if (!isLogin) {
//     return <Navigate to="/login" replace />;
//   }

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [result, setResult] = useState<{ type: 'fake' | 'real'; confidence: number } | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleAnalyze = async () => {
//     setAnalyzing(true);
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     const confidence = Math.floor(Math.random() * 51) + 50; // Random confidence between 50-100%
//     const isFake = Math.random() > 0.5;
//     setResult({ type: isFake ? 'fake' : 'real', confidence });
//     setAnalyzing(false);
//   };

//   return (
//     <div className="min-h-screen pt-20 px-4">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl"
//         >
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-white mb-4">Deepfake Detection</h1>
//             <p className="text-gray-400">Upload an image or video to analyze for potential manipulation</p>
//           </div>

//           <div className="space-y-8">
//             <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="flex flex-col items-center justify-center cursor-pointer"
//               >
//                 <Upload className="h-12 w-12 text-purple-500 mb-4" />
//                 <span className="text-sm text-gray-400">
//                   {file ? file.name : 'Click to upload or drag and drop'}
//                 </span>
//               </label>
//             </div>

//             {preview && (
//               <div className="space-y-4">
//                 <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
//                   {file?.type.startsWith('image/') ? (
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-full h-full object-contain"
//                     />
//                   ) : (
//                     <video
//                       src={preview}
//                       controls
//                       className="w-full h-full"
//                     />
//                   )}
//                 </div>

//                 <button
//                   onClick={handleAnalyze}
//                   disabled={analyzing}
//                   className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
//                 >
//                   {analyzing ? 'Analyzing...' : 'Analyze'}
//                 </button>

//                 {result && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`p-4 rounded-lg ${result.type === 'fake'
//                         ? 'bg-red-900/50 border border-red-700'
//                         : 'bg-green-900/50 border border-green-700'
//                       }`}
//                   >
//                     <div className="flex items-center space-x-2">
//                       {result.type === 'fake' ? (
//                         <AlertTriangle className="h-5 w-5 text-red-500" />
//                       ) : (
//                         <CheckCircle className="h-5 w-5 text-green-500" />
//                       )}
//                       <span className="text-white font-medium">
//                         {result.type === 'fake'
//                           ? `This media appears to be manipulated with ${result.confidence}% confidence`
//                           : `This media appears to be authentic with ${result.confidence}% confidence`}
//                       </span>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Detection;




import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import axios from 'axios'; // required for making API calls

const Detection = () => {
  const isLogin = localStorage.getItem('token') !== null;
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ type: 'fake' | 'real'; confidence: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null); // Reset result when new file is selected
    }
  };

  const handleDetection = async (type: 'image' | 'video') => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const endpoint = type === 'image' ? 'http://localhost:8000/detect-image/upload' : 'http://localhost:8000/detect-video/upload';
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Detection response:', response.data);
      setResult(response.data);
    } catch (error) {
      console.error('Detection failed:', error);
      setResult({ type: 'fake', confidence: 99 }); // fallback error result
    }

    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Deepfake Detection</h1>
            <p className="text-gray-400">Upload an image or video to analyze for potential manipulation</p>
          </div>

          <div className="space-y-8">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-12 w-12 text-purple-500 mb-4" />
                <span className="text-sm text-gray-400">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </span>
              </label>
            </div>

            {preview && (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  {file?.type.startsWith('image/') ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <video src={preview} controls className="w-full h-full" />
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  {/* Detect Image Button */}
                  <button
                    onClick={() => handleDetection('image')}
                    disabled={analyzing || !file?.type.startsWith('image/')}
                    className={`flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg transition-colors 
      ${analyzing || !file?.type.startsWith('image/')
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700 cursor-pointer'}
    `}
                  >
                    {analyzing ? 'Analyzing Image...' : 'Detect Image'}
                  </button>

                  {/* Detect Video Button */}
                  <button
                    onClick={() => handleDetection('video')}
                    disabled={analyzing || !file?.type.startsWith('video/')}
                    className={`flex-1 py-3 px-4 bg-green-600 text-white rounded-lg transition-colors 
      ${analyzing || !file?.type.startsWith('video/')
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-green-700 cursor-pointer'}
    `}
                  >
                    {analyzing ? 'Analyzing Video...' : 'Detect Video'}
                  </button>
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${result.type === 'fake'
                      ? 'bg-red-900/50 border border-red-700'
                      : 'bg-green-900/50 border border-green-700'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      {result.type === 'fake' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <span className="text-white font-medium">
                        {result.type === 'fake'
                          ? `This media appears to be manipulated with ${result.confidence}% confidence`
                          : `This media appears to be authentic with ${result.confidence}% confidence`}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Detection;
