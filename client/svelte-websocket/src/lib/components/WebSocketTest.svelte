<script lang="ts">
  import { onMount } from "svelte";

  const openSocketConnection = () => {
    const socket = new WebSocket("ws://localhost:8081");

    socket.addEventListener("open", (event) => {
      console.log("WebSocket Connected");

      socket.send("Hello Server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server", event.data);
    });
  };
  console.log("on mount");

  onMount(() => {
    console.log("on mount");
    openSocketConnection();
  });
</script>

<h1>Welcome socket component</h1>
