"use client";

import ButtonAccount from "@/components/ButtonAccount";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import ButtonCheckout from "@/components/ButtonCheckout";
import { LEMONSQUEEZY } from "@/config";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
const MAX_RECONNECTION_ATTEMPTS = 10;
const RECONNECTION_DELAY = 1000;
const CONNECTION_TIMEOUT = 20000;

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [profile, setProfile] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('hobby');
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Mode 1');
  const [videoPreview, setVideoPreview] = useState(null);
  const [ws, setWs] = useState(null);
  const supabase = createClient();

  // Initialize WebSocket connection
  useEffect(() => {
    console.log('🔌 Attempting WebSocket connection to:', BACKEND_URL);
    
    const socket = io(BACKEND_URL, {
      transports: ['polling', 'websocket']
    });

    socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
      // Send immediate ping
      console.log('🏓 Sending ping to backend...');
      socket.emit('ping');
    });

    socket.on('pong', (data) => {
      console.log('🏓 Received pong from backend:', data);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ WebSocket Connection Error:', error.message);
    });

    socket.on('disconnect', (reason) => {
      console.log('🔌 WebSocket Disconnected:', reason);
    });

    socket.on('progress', (data) => {
      console.log('📊 Processing Progress:', data.progress);
      setProcessingProgress(data.progress);
    });

    setWs(socket);

    return () => {
      if (socket) {
        console.log('🧹 Cleaning up WebSocket');
        socket.disconnect();
      }
    };
  }, []);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    try {
      // Create a promise to handle video metadata loading
      const getVideoDuration = () => {
        return new Promise((resolve, reject) => {
          const video = document.createElement('video');
          video.preload = 'metadata';

          video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration);
          };

          video.onerror = () => {
            window.URL.revokeObjectURL(video.src);
            reject(new Error('Error loading video metadata'));
          };

          video.src = URL.createObjectURL(uploadedFile);
        });
      };

      console.log('📁 Processing uploaded file:', {
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type
      });

      const duration = await getVideoDuration();
      console.log('🎬 Video duration:', duration, 'seconds');

      if (duration > 60) {
        alert('Please upload a video that is 1 minute or shorter');
        return;
      }

      setFile(uploadedFile);
      setUploadSuccess(true);
      setVideoPreview(null);

    } catch (error) {
      console.error('❌ Error processing video:', error);
      alert('Error processing video file. Please try again.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      // Check if video is under 1 minute and 1080p
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = function() {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 60) {
          alert('Please upload a video that is 1 minute or shorter');
          return;
        }
        setFile(droppedFile);
        setUploadSuccess(true);
        setVideoPreview(null); // Reset video preview when new file is dropped
      }

      video.src = URL.createObjectURL(droppedFile);
    } else {
      alert('Please upload a video file');
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      alert('Please upload a video first');
      return;
    }

    if (!ws?.connected) {
      console.log('⚠️ Socket.IO not connected, attempting to reconnect...');
      ws?.connect();
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!ws?.connected) {
        alert('Unable to connect to server. Please try again.');
        return;
      }
    }

    try {
      setIsProcessing(true);
      setProcessingProgress(0);

      const formData = new FormData();
      formData.append('video', file);

      console.log('🚀 Starting video upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        socketConnected: ws?.connected,
        backendUrl: BACKEND_URL
      });

      const response = await fetch(`${BACKEND_URL}/process`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Upload response:', data);

    } catch (error) {
      console.error('❌ Error during video processing:', error);
      alert('Error processing video. Please try again.');
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  // Update the upload button's disabled state - only disable during processing
  const isGenerateDisabled = !file || isProcessing;

  useEffect(() => {
    const checkUser = async () => {
      // TEMPORARY CHANGE FOR DEVELOPMENT - RESTORE BEFORE PRODUCTION
      // Original auth check commented out:
      /*
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/signin");
        return;
      }

      // Check subscription status
      const { data: userProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      */

      // Mock profile with access for development
      const mockProfile = {
        id: 'dev-user',
        full_name: 'Development User',
        has_access: true
      };

      setProfile(mockProfile);
      setIsLoading(false);
    };

    checkUser();
  }, [router, supabase, supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  const hasAccess = profile?.has_access || false;
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen p-4 bg-white">
      <div className="max-w-6xl mx-auto space-y-4 transform scale-[0.95] origin-top">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <a
            href="/"
            className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors duration-200"
          >
            Cool Captions Dashboard
          </a>
          <ButtonAccount />
        </div>

        {/* Welcome Message */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-xl font-bold text-primary">
            Welcome {firstName}! 👋
          </h2>
          {!hasAccess ? (
            <div className="bg-red-500 text-white p-3 rounded-lg mt-3 text-sm">
              <p>
                Your subscription is inactive. Please subscribe to access all
                features.
              </p>
            </div>
          ) : (
            <div className="mt-3 text-sm text-gray-600">
              <p>Please contact us for any questions you may have.</p>
              <p className="mt-2">
                Thanks,
                <br />
                Cool Captions Team
              </p>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {hasAccess && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and Controls */}
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="bg-white rounded-[20px] border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
                <div
                  className="min-h-[200px] flex flex-col items-center justify-center cursor-pointer p-6"
                  onClick={() => document.getElementById('fileInput').click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {!file ? (
                    <>
                      <div className="bg-gray-50 p-4 rounded-full mb-4">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">Upload your video</h3>
                      <p className="text-sm text-gray-500">Click or drag and drop (max 1 minute)</p>
                    </>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-1 text-primary">{file.name}</h3>
                      {uploadSuccess && (
                        <p className="text-green-500 text-sm">Video uploaded!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Mode Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Mode:</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedMode('Mode 1')}
                      disabled={isProcessing}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedMode === 'Mode 1'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Mode 1
                    </button>
                    <button
                      onClick={() => setSelectedMode('Mode 2')}
                      disabled={isProcessing}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedMode === 'Mode 2'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Mode 2
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled}
                  className={`w-full py-2.5 rounded-full font-medium text-sm transition-colors ${
                    !isGenerateDisabled
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Generate'}
                </button>
              </div>
            </div>

            {/* Right Column - Video Preview */}
            <div className="bg-gray-50 rounded-[20px] overflow-hidden">
              <div className="aspect-video w-full bg-gray-900 relative">
                {videoPreview ? (
                  <video
                    className="w-full h-full"
                    controls
                    src={videoPreview}
                    preload="metadata"
                  />
                ) : isProcessing ? (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-24 h-24 relative mx-auto mb-4">
                        {/* Circular progress bar */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            className="text-gray-700"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r="44"
                            cx="48"
                            cy="48"
                          />
                          <circle
                            className="text-primary"
                            strokeWidth="4"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="44"
                            cx="48"
                            cy="48"
                            style={{
                              strokeDasharray: `${2 * Math.PI * 44}`,
                              strokeDashoffset: `${2 * Math.PI * 44 * (1 - processingProgress / 100)}`,
                              transition: 'stroke-dashoffset 0.3s ease'
                            }}
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <span className="text-xl font-semibold">{Math.round(processingProgress)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Processing your video...</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400">Preview will appear here</p>
                    </div>
                  </div>
                )}
                
                {/* Video Controls - Only show if no video preview */}
                {!videoPreview && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="flex items-center gap-4">
                      <button className="text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <div className="flex-1 h-1 bg-white/30 rounded-full">
                        <div className="h-full w-0 bg-white rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">0:00 / 0:00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {!hasAccess && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-[28px] p-8 border-2 border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/20">
              {/* Plan Switcher */}
              <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1 rounded-full flex">
                  <button
                    onClick={() => setSelectedPlan('hobby')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedPlan === 'hobby'
                        ? 'bg-white text-black shadow-md'
                        : 'text-gray-600'
                    }`}
                  >
                    Hobby
                  </button>
                  <button
                    onClick={() => setSelectedPlan('pro')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedPlan === 'pro'
                        ? 'bg-white text-black shadow-md'
                        : 'text-gray-600'
                    }`}
                  >
                    Pro
                  </button>
                </div>
              </div>

              {selectedPlan === 'hobby' ? (
                <>
                  <h3 className="text-3xl font-black mb-1 text-[#0B0F1C]">
                    30 Videos
                  </h3>
                  <p className="text-4xl font-black mb-6">
                    $29/month
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-black mb-1 text-[#0B0F1C]">
                    Unlimited Videos
                  </h3>
                  <p className="text-4xl font-black mb-6">
                    $59/month
                  </p>
                </>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-base">4K + 60 FPS</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-base">Professional Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-base">Multiple Video Formats</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-base">Premium Caption Themes</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B5CF6]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-base">530K+ Active Users</span>
                </div>
              </div>

              <ButtonCheckout 
                variantId={selectedPlan === 'hobby' ? LEMONSQUEEZY.hobbyVariantId : LEMONSQUEEZY.proVariantId} 
              />

              <div className="mt-4 text-center text-gray-500 text-sm">
                Cancel Anytime | Satisfaction Guaranteed
              </div>

              {profile?.has_access && (
                <div className="mt-8 flex justify-between items-center">
                  <div className="flex gap-2">
                    <img src="/visa.svg" alt="Visa" className="h-8" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                    <img src="/amex.svg" alt="American Express" className="h-8" />
                    <img src="/gpay.svg" alt="Google Pay" className="h-8" />
                    <img src="/applepay.svg" alt="Apple Pay" className="h-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-bold">10M+</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Support Links */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm h-12 bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Join our Discord Community!
        </a>
      </div>
    </main>
  );
}
