(function (){
    const originalVibrate = navigator.vibrate;
    var timeout = null;
    var _b = document.body || false;
    var enabled = true;
    
    navigator.vibrate = function(){
        
        var timer = 0;
        var curToggleStatus = true;
        
        if (!enabled) {
            return false;
        }
        
        enabled = false;

        function toggle (force) {
            if(!_b) return;
            if(curToggleStatus && !force){
                _b.classList.add('vibrating');
            }else{
                _b.classList.remove('vibrating');
            }
            curToggleStatus = !curToggleStatus;
        }

        (arguments[0] || []).forEach(function(cur){
            timeout = setTimeout(toggle, timer);
            timer+= cur;
        });
        setTimeout(function(){
            toggle(true);
            enabled = true;
        }, ++timer);
        return originalVibrate.apply(navigator, arguments);
    };
    
    var start = 0;
    var result = document.getElementById('created-result');
    var finalVib = [];
    
    document.getElementById('clear-button').addEventListener('click', function () {
        result.innerHTML = '';
        finalVib = [];
        start = 0;
        clearTimeout(timeout);
        _b.classList.remove('recording');
    });
    document.getElementById('vib-button').addEventListener('click', function () {
        window.navigator.vibrate(finalVib.length? finalVib : [
            500, 200, 500, 200, 500,
            200, 100, 200, 100, 200, 500,
            200, 100, 200, 100, 200, 500
        ]);
    });
    
    function down () {
        var d = new Date();
        var newStart = d.getTime();
        if (start) {
            finalVib.push(newStart - start);
        }
        start = newStart;
    }
    
    function up () {
        var d = new Date();
        var end = d.getTime();
        finalVib.push(end - start);
        result.innerHTML= finalVib.map(function(cur, idx, arr){
            return idx%4===0? '<br/>&nbsp;&nbsp;' + cur: cur;
        });
        start = d.getTime();
    }
    
    document.getElementById('start-recording-btn').addEventListener('click', function () {
        enabled = !enabled;
        _b.classList.toggle('recording');
    });
    
    document.getElementById('listen-button').addEventListener('mousedown', down);
    document.getElementById('listen-button').addEventListener('mouseup', up);
})();



/*
// plays the imperial march
window.navigator.vibrate([500, 200, 500, 200, 500,
200, 100, 200, 100, 200, 500,
200, 100, 200, 100, 200, 500
]);
*/