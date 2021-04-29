new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoCurar: [3, 6],
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos=[];
            return this.hayUnaPartidaEnJuego = true;
        },
        atacar: function () {
            this.ataqueDelMonstruo();
            const damage = Math.floor(Math.random()*(this.rangoAtaque[1] - this.rangoAtaque[0] + 1))
            this.saludMonstruo -= damage;
            const evento = {
                esJugador:true,
                damage: damage
            }
            this.registrarEvento(evento)
            this.verificarGanador();
            this.turnos.reverse();
        },

        ataqueEspecial: function () {
            this.ataqueDelMonstruo();
            const damage = Math.floor(Math.random()*(this.rangoAtaqueEspecial[1] - this.rangoAtaqueEspecial[0] + 1))
            this.saludMonstruo -= damage;
            const evento = {
                esJugador:true,
                damage: damage
            }
            this.registrarEvento(evento)
            this.verificarGanador();
            this.turnos.reverse();
        },
        
        curar: function () {
            this.ataqueDelMonstruo();
            const cura = Math.floor(Math.random()*(this.rangoCurar[1] - this.rangoCurar[0] + 1))
            this.saludJugador += cura;
            this.turnos.push({ 
                esJugador:true,
                text: "El jugador se curo :"+ cura
            })
            this.verificarGanador();
            this.turnos.reverse();
        },
        
        ataqueDelMonstruo: function () {
            const damage = Math.floor(Math.random()*(this.rangoAtaqueDelMonstruo[1] - this.rangoAtaqueDelMonstruo[0] + 1))
            this.saludJugador -= damage;
            const evento = {
                esJugador:false,
                damage: damage
            }
            this.registrarEvento(evento)
        },

        terminarPartida: function () {
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos=[];
            return this.hayUnaPartidaEnJuego = false;
        },

        verificarGanador: function () {
            if(this.saludJugador<=0 && this.saludMonstruo<=0)
            {
                this.hayUnaPartidaEnJuego = false;
                this.saludJugador=0; 
                this.saludMonstruo=0; 
                alert("EMPATE!")
            }else if(this.saludJugador<=0 || this.saludMonstruo<=0){
                this.hayUnaPartidaEnJuego = false;
                if(this.saludJugador<=0){this.saludJugador=0; alert("EL MOUNSTRUO GANO!")}
                if(this.saludMonstruo<=0){this.saludMonstruo=0; alert("EL JUGADOR GANO!");}
            }   
        },

        registrarEvento(evento) {
            this.turnos.push({ 
                esJugador:evento.esJugador,
                text: "El "+(evento.esJugador?"jugador":"mounstruo")+" ataco al "+(!evento.esJugador?"jugador":"mounstruo")+" por :"+ evento.damage
            })
        },

        calcularHeridas: function (rango) {
            return 0
        },

        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});