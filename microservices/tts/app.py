import asyncio
from typing import AsyncIterator, Optional
from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import StreamingResponse
import edge_tts

app = FastAPI(title="Edge TTS API")

DEFAULT_VOICE = "en-US-AriaNeural"
DEFAULT_FORMAT = "audio-24khz-48kbitrate-mono-mp3"  # good balance of quality/size

def format_to_mime(fmt: str) -> str:
    fmt = fmt.lower()
    if "mp3" in fmt:
        return "audio/mpeg"
    if "opus" in fmt or "ogg" in fmt:
        return "audio/ogg"
    if "pcm" in fmt or "wav" in fmt or "riff" in fmt:
        return "audio/wav"
    return "application/octet-stream"

async def tts_stream(
    text: str,
    voice: str,
    rate: Optional[str],
    pitch: Optional[str],
) -> AsyncIterator[bytes]:
    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate=rate or "+0%",    # e.g. "+10%" or "-5%"
        pitch=pitch or "+0Hz",  # e.g. "+5Hz" or "-10Hz"
    )
    async for chunk in communicate.stream():
        t = chunk.get("type")
        if t == "audio":
            yield chunk["data"]
        elif t == "error":
            # bubble up errors with details from edge-tts
            raise HTTPException(status_code=500, detail=str(chunk["data"]))
        # other chunk types (e.g. "meta") can be ignored

@app.get("/tts")
async def tts(
    text: str = Query(..., min_length=1, description="Text to synthesize"),
    voice: str = Query(DEFAULT_VOICE, description="Voice name, e.g. en-US-AriaNeural"),
    rate: Optional[str] = Query(None, description='Speed e.g. "+10%" or "-5%"'),
    pitch: Optional[str] = Query(None, description='Pitch e.g. "+5Hz" or "-10%"'),
    filename: str = Query("speech.mp3", description="Suggested filename"),
):
    headers = {
        "Content-Disposition": f'inline; filename="{filename}"'
    }
    return StreamingResponse(
        tts_stream(text, voice, rate, pitch),
        media_type="audio/mpeg",
        headers=headers,
    )

# --- Run with: python this_file.py ---
import uvicorn

if __name__ == "__main__":
    # If you're on Windows + Python 3.8, uncomment this:
    # asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    uvicorn.run(
        "tts.app:app",         # pass as import string to enable reload
        host="0.0.0.0",
        port=8000,
        reload=True,           # auto-reload on file changes
        log_level="info"
    )
