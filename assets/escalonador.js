$(document).ready(function() {
    // Adiciona os valores dos inputs dos processos a um objeto
    $('#iniciar').on('click', function(event){
        event.preventDefault(); // Impede a ação padrão do botão
        
        var numProcessos = $('#numero_processos').val();
        var allFilled = true;
        
        var quantum = $('#quantum').val()
        var sobrecarga = $('#sobrecarga').val()
        
        if(!numProcessos || !quantum || !sobrecarga) {
            allFilled = false;
        }
        for (var i = 1; i <= numProcessos; i++) {
            var chegada = $('#chegada' + i).val();
            var tempo = $('#tempo' + i).val();
            var deadline = $('#deadline' + i).val();
            
            if (!numProcessos || !quantum || !sobrecarga || !chegada || !tempo || !deadline) {
                allFilled = false;
                break;
            }
        }
        
        if (!allFilled) {
            $('#alert-modal').modal('open'); // Abre o modal de erro
        } else {
            var processos = [];
            for (var i = 1; i <= numProcessos; i++) {
                var processo = {
                    id: i,
                    chegada: $('#chegada' + i).val(),
                    tempo: $('#tempo' + i).val(),
                    deadline: $('#deadline' + i).val()
                };
                processos.push(processo);
            }
            
            console.log(processos); // Você pode substituir isso por qualquer outra ação
        }
    });    
});