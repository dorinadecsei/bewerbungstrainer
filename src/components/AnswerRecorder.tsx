
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Square, Video, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnswerRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const AnswerRecorder: React.FC<AnswerRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const { toast } = useToast();
  
  // Timer for recording duration
  React.useEffect(() => {
    let interval: number | undefined;
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startRecording = async () => {
    try {
      // Request both audio and video permissions if video is enabled, otherwise just audio
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: isVideoEnabled
      });
      
      // Display video stream if video is enabled
      if (isVideoEnabled && stream.getVideoTracks().length > 0) {
        const videoElement = document.getElementById('video-preview') as HTMLVideoElement;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      }
      
      // Initialize MediaRecorder
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      // Collect data
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      // When recording stops
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        setAudioChunks(chunks);
        onRecordingComplete(audioBlob);
      };
      
      // Start recording
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      toast({
        title: "Aufnahme gestartet",
        description: "Ihre Antwort wird aufgezeichnet.",
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Die Aufnahme konnte nicht gestartet werden. Bitte erteilen Sie die erforderlichen Berechtigungen.",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      
      // Stop all media tracks
      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
      
      setIsRecording(false);
      toast({
        title: "Aufnahme beendet",
        description: "Ihre Antwort wurde erfolgreich aufgezeichnet.",
      });
    }
  };
  
  const toggleVideo = () => {
    if (!isRecording) {
      setIsVideoEnabled(!isVideoEnabled);
    } else {
      toast({
        variant: "destructive",
        title: "Nicht möglich",
        description: "Sie können den Videomodus während der Aufnahme nicht ändern.",
      });
    }
  };
  
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {isVideoEnabled && (
            <div className="relative bg-brand-gray rounded-lg overflow-hidden h-64 flex items-center justify-center">
              {isRecording ? (
                <video 
                  id="video-preview"
                  autoPlay 
                  muted 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-6">
                  <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    Video wird erscheinen, sobald die Aufnahme startet
                  </p>
                </div>
              )}
              {isRecording && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-recording"></div>
                  <span>LIVE {formatTime(recordingTime)}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className={`${isVideoEnabled ? 'bg-brand-blue text-white' : ''}`}
              onClick={toggleVideo}
              disabled={isRecording}
            >
              <Video className="w-4 h-4 mr-2" />
              {isVideoEnabled ? 'Video deaktivieren' : 'Video aktivieren'}
            </Button>
            
            <div className="flex gap-2">
              {!isRecording ? (
                <Button
                  variant="default"
                  className="bg-brand-blue hover:bg-brand-blue/90"
                  onClick={startRecording}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Aufnahme starten
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={stopRecording}
                >
                  <Square className="w-4 h-4 mr-2" />
                  Aufnahme beenden {formatTime(recordingTime)}
                </Button>
              )}
            </div>
          </div>
          
          {isRecording && (
            <div className="flex items-center justify-center gap-2 text-brand-blue">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Ihre Antwort wird aufgezeichnet...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerRecorder;
