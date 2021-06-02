(function(){
    function setFont(){
        var designWidth=750;
        document.documentElement.style.fontSize=(document.documentElement.clientWidth/designWidth)*100+'px';
    }
    setFont();
    window.addEventListener('resize',setFont);
}())