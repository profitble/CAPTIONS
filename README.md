# AI Dynamic Captions

![AI Dynamic Captions](/public/assets/images/cover.png)

High-performance video content automation system leveraging GPU-accelerated processing and multi-modal AI for dynamic caption generation. Built on distributed cloud architecture with NVIDIA CUDA acceleration.

## System Architecture

### Core Components
```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js UI    │────▶│   FastAPI Core   │────▶│  RunPod Worker  │
│  WebSocket Sub  │◀────│   Job Orchestr.  │◀────│  GPU Processor  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                        │
         │                       │                        │
         └───────────┬──────────┴────────────┬──────────┘
                     ▼                       ▼
              ┌──────────────┐        ┌──────────────┐
              │    AWS S3    │        │     AI       │
              │Asset Storage │        │  Services    │
              └──────────────┘        └──────────────┘
```

### Technical Stack
- **Frontend:** Next.js 14 (React), WebSocket-based real-time monitoring
- **Backend:** FastAPI (Python), asyncio-based job orchestration
- **Processing:** FFmpeg with NVIDIA CUDA acceleration
- **Infrastructure:** RunPod GPU instances (A4000/A5000)
- **AI Models:** OpenAI GPT-4, Whisper ASR, ElevenLabs TTS
- **Container Runtime:** Docker (linux/amd64) with NVIDIA support

## Implementation Details

### GPU-Accelerated Video Processing
```python
# FFmpeg hardware acceleration configuration
FFMPEG_GPU_CONFIG = {
    'input_flags': ['-hwaccel', 'cuda', '-hwaccel_output_format', 'cuda'],
    'output_codec': 'h264_nvenc',
    'preset': 'p7',
    'tune': 'll',
    'bitrate': '6M'
}
```

### Parallel Processing Pipeline
```mermaid
graph LR
    A[Video Input] --> B[Chunk Segmentation]
    B --> C[GPU Transcoding]
    C --> D[ASR Processing]
    D --> E[Caption Generation]
    E --> F[Frame Rendering]
    F --> G[Final Encoding]
```

### Worker Configuration
```dockerfile
FROM nvidia/cuda:11.8.0-base-ubuntu22.04

# CUDA Configuration
ENV CUDA_HOME=/usr/local/cuda
ENV PATH=/usr/local/cuda/bin:${PATH}
ENV LD_LIBRARY_PATH=/usr/local/cuda/lib64:${LD_LIBRARY_PATH}

# FFmpeg Build Configuration
ARG FFMPEG_VERSION=5.1.2
ARG NVIDIA_HEADERS_VERSION=11.1.5.2
```

## Performance Metrics

### Processing Speed
- **GPU Acceleration:** 10x faster than CPU-based processing
- **Parallel Pipeline:** 4x throughput improvement
- **Memory Utilization:** 85% GPU memory efficiency

### Resource Utilization
```python
RESOURCE_CONFIG = {
    'gpu_memory': '16GB',
    'cuda_cores': 6144,
    'vram_allocation': '14GB',
    'max_parallel_jobs': 4
}
```

## Technical Optimizations

### Memory Management
- Dynamic VRAM allocation based on video resolution
- Intelligent buffer management for frame processing
- Automated cleanup of temporary GPU memory allocations

### Processing Pipeline
```python
@dataclass
class ProcessingConfig:
    chunk_size: int = 30  # seconds
    overlap: int = 2      # seconds
    max_retries: int = 3
    timeout: int = 300    # seconds
    gpu_batch_size: int = 8
```

### Error Handling
- Graceful degradation during GPU memory pressure
- Automatic worker recovery after CUDA errors
- Smart retry mechanism for transient failures

## Performance Benchmarks
| Resolution | FPS | GPU Memory | Processing Time |
|------------|-----|------------|-----------------|
| 1080p      | 60  | 4GB       | 0.5x realtime   |
| 2K         | 60  | 6GB       | 0.8x realtime   |
| 4K         | 30  | 12GB      | 1.2x realtime   |

*Made with lots of love and boba 🧋*
