<script module lang="ts">
  export type StatusWS = "loading" | "ready" | "error";
  
</script>

<script lang="ts">
  import { onMount } from "svelte";
  const teamAvailable = ["A", "B"];
  let socket: WebSocket | null = null;
  let statusWebSocket = $state<StatusWS>("loading"); // connected, unconnected, idle
  let event = $state<any>();
  let teamSelected = $state("")

  onMount(() => {
    socket = new WebSocket("ws://localhost:8081");

    socket.addEventListener("open", () => {
        statusWebSocket = 'ready';
    });

    socket.addEventListener("message", (_event) => {
        event = _event.data;
    });
  });


  function changeTeam(e: Event & { currentTarget: EventTarget & HTMLSelectElement; }): any {
    teamSelected = e.currentTarget.value
  }


  function selectTeam(): any {
    if (socket && 
    statusWebSocket === 'ready' && teamSelected !== "") {
        console.log(socket, statusWebSocket, teamSelected)

        socket.send(JSON.stringify({ 
            type: 'slot',
            team: teamSelected
         }))
    }
  }
</script>

<div>
  <span>{statusWebSocket}</span>
</div>
{#if statusWebSocket === 'ready'}
<select onchange="{(e) => changeTeam(e)}"
    value={teamSelected}
    >
    <option value="A"> TEAM A</option>
    <option value="B"> TEAM B</option>
</select>
<button
    aria-label="select-team"
 onclick="{() => selectTeam()}" > Confirm Team</button>

{/if}
