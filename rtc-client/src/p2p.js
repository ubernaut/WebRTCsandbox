//https://w3c.github.io/webrtc-pc/#example-12
const signaling = new SignalingChannel(); // handles JSON.stringify/parse
const configuration = {iceServers: [{urls: 'stun:stun.example.org'}]};
let pc, channel;

// call start() to initiate
function start() {
  pc = new RTCPeerConnection(configuration);

  // send any ice candidates to the other peer
  pc.onicecandidate = ({candidate}) => signaling.send({candidate});

  // let the "negotiationneeded" event trigger offer generation
  pc.onnegotiationneeded = async () => {
    try {
      await pc.setLocalDescription();
      // send the offer to the other peer
      signaling.send({description: pc.localDescription});
    } catch (err) {
      console.error(err);
    }
  };

  // create data channel and setup chat using "negotiated" pattern
  channel = pc.createDataChannel('chat', {negotiated: true, id: 0});
  channel.onopen = () => input.disabled = false;
  channel.onmessage = ({data}) => showChatMessage(data);

  input.onkeypress = ({keyCode}) => {
    // only send when user presses enter
    if (keyCode != 13) return;
    channel.send(input.value);
  }
}

signaling.onmessage = async ({data: {description, candidate}}) => {
  if (!pc) start(false);

  try {
    if (description) {
      await pc.setRemoteDescription(description);
      // if we got an offer, we need to reply with an answer
      if (description.type == 'offer') {
        await pc.setLocalDescription();
        signaling.send({description: pc.localDescription});
      }
    } else if (candidate) {
      await pc.addIceCandidate(candidate);
    }
  } catch (err) {
    console.error(err);
  }
};
