<template>
				<div>
        <div id="encabezado">
					<notifications group="foo"/>
		<h1>Proyecto Vue.js - David Medina Vega</h1>
		</div>
				<div v-if='n'>
        <input  v-model="nick" class="form-control input-lg" type="text">
            <span class="input-group-btn">
                <button v-on:click="mandarN()" class="btn btn-lg btn-primary">Send</button>
             </span>
</div>
<div v-else>
		<div  id="inpu">
    <input v-model="message" v-on:keyup.enter="add" placeholder="¿Que quieres recordar?">

    </div>


    <div class="container">
		<div class="row">
		<div class="col-sm-4">{{completadas}} Tareas pendientes de un total de {{this.todos.length}}</div>
  <div class="col-sm-3"> <a href="#" v-on:click="borrarT" >X Borrar tareas completadas</a></div>
</div>
 
</div>
		 <transition-group name="notas" tag="p">
		<div class="note"  v-for="(todo) in array_order" v-bind:key="todo" > 
		
		<div>

				<img v-if="todo.completada" id="tick" v-on:click="cambiarE(todo)" src="../assets/tick.png">
				<img v-else  id="circulo" v-on:click="cambiarE(todo)" src="../assets/circulo.gif">
				<h1 v-bind:class="{ titulo: todo.completada }">{{todo.Tarea}}</h1>
			 
</div>
	Prioridad:
	<button v-if="todo.prioridad == 'Zlow'" type="button" class="btn btn-info btn-sm">Low</button>
	<button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="priority(todo,'Zlow')">Low</button>
		<span>&nbsp;</span>
		<button v-if="todo.prioridad == 'Normal'" type="button" class="btn btn-primary btn-sm">Normal</button>
	<button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="priority(todo,'Normal')">Normal</button>
	<span>&nbsp;</span>
<button v-if="todo.prioridad == 'High'" type="button" class="btn btn-danger btn-sm">High</button>
	<button v-else type="button" class="btn btn-secondary btn-sm" v-on:click="priority(todo,'High')">High</button>
<span>&nbsp;</span>
		
	
		
			<img id="clock" src="../assets/si-glyph-clock.svg"/> Añadido hace {{ todo.fecha_creacion | moment("from", new Date()) }} 
			Creado por: {{todo.nick}}
			<button class="borrar"  v-on:click="borrar(todo)"></button>

</div>

  </transition-group>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
	</div>
</div>

</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'notes',
  data(){
    return{
    message:'',
			todos_filter:[],
			todos:[],
			nick:'',
			n:true,
			socket : io('localhost:3000'),
		//CHAT 
		participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'user2',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          { type: 'text', author: `me`, data: { text: `Say yes!` } },
          { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    add: function () {
    	this.todos.push({Tarea:this.message,prioridad:"High",fecha_creacion:new Date(),completada:true,nick:this.nick})
		this.message = '';


		this.socket.emit('send_notas',this.todos)
		
    },
		mandarN: function(){
			this.n=false;
				this.socket.emit('send_nick',this.nick)
		},
	borrar: function(todo) {
				this.todos.splice(todo,1);
				this.socket.emit('send_notas',this.todos);
        },
	borrarT:function(){
		let fin = this.todos.filter(function(todo){
			return !todo.completada;
		});
		this.todos = fin;
		this.socket.emit('send_notas',this.todos);
	},
	cambiarE:function(todo){
		todo.completada=!todo.completada;
		this.socket.emit('send_notas',this.todos);
	},

	priority:function(todo,prioridad){
		todo.prioridad = prioridad;
		this.socket.emit('send_notas',this.todos);
},
//CHAT METHOD
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author:{nick}, type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
		
      // called when the user sends a message
	  this.messageList = [ ...this.messageList, message ]
	  	this.socket.emit('send_message',this.messageList);
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
   
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
		},
    computed:{
	completadas: function(){
		let completadas = this.todos.filter(function(todo){
			return !todo.completada;
		});
		return completadas.length;

	},
	array_order: function(){

	let ordenadas = _.orderBy(this.todos,'prioridad');
		return ordenadas;

	},
	
sockets: {
    connect: function () {
        console.log('socket connected')
    },
    notas: function (data) {
        this.todos=data;
    },
    
     
},

},
mounted(){
	 this.socket.on('notas', (data) => {
           this.todos = data;
		});
		
		 this.socket.on('message', (data) => {
           this.messageList = data;
    });
    this.socket.on('participantes',(data)=>{

            this.participants=data;
    })
}

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titulo{
 color:#43B232;
   text-decoration: line-through;
   margin-left:10px;
}
input{
	height: 100px;
	width:80%;
	border:1px solid black;
	border-radius:15px 15px 15px 15px;
}

h1{
    display:inline;
    
}
#circulo{
	
	height:30px;
	width:30px;
}

#tick{
	height:30px;
	width:30px;
}
#encabezado{
	margin-bottom: 50px;
}
#inpu{
	margin-bottom:50px;
}
.container{
	margin-bottom:50px;
}
a {
  color: orange;
}
.note{
	border: 1px solid white;
	width:80%;
	margin-left:10%;
}
.borrar{
	background-color:red;
	background-image:url(../assets/si-glyph-circle-remove.svg);
	height:40px;
	width:40px;
}
#clock{
	width:20px;
	height:20px;
}

.notas-enter-active, .notas-leave-active {
  transition: all 1s;
}
.notas-enter, .notas-leave-to /* .notas-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
