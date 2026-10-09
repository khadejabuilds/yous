(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pupils=[].slice.call(document.querySelectorAll('.pupil'));
  if(!reduce){
    window.addEventListener('pointermove',function(e){
      pupils.forEach(function(p){
        var r=p.parentNode.getBoundingClientRect();
        var cx=r.left+r.width/2,cy=r.top+r.height/2;
        var dx=e.clientX-cx,dy=e.clientY-cy;
        var d=Math.sqrt(dx*dx+dy*dy)||1;
        var m=Math.min(7,d/20);
        p.style.transform='translate('+(dx/d*m)+'px,'+(dy/d*m*0.8)+'px)';
      });
    },{passive:true});
  }
  var btn=document.getElementById('copy'),out=document.getElementById('copied'),addr=document.getElementById('addr');
  btn.addEventListener('click',function(){
    function fallback(){
      try{var s=window.getSelection(),r=document.createRange();r.selectNodeContents(addr);s.removeAllRanges();s.addRange(r);out.textContent='Selected. Press copy on your keyboard.';}catch(e){}
    }
    try{
      navigator.clipboard.writeText(addr.textContent).then(function(){out.textContent='Copied to clipboard';},fallback);
    }catch(e){fallback();}
  });
})();
