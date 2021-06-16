
$(".inputs").keydown(function (e) {
    var code = e.keyCode || e.which;
    if(code>=48&&code<=57) { 
    if (this.value.length == this.maxLength) {
        var $next = $(this).next('.inputs');
        $next.val("");
        if ($next.length)
            $(this).next('.inputs').focus();
        else
            $(this).blur();
      }
    }
    
});

$("#inputForm .submit").click(Calculate);

var solutions = [];

function Calculate(){
    
    var values = [$("#inputForm input[name=val1]").val(),
    $("#inputForm input[name=val2]").val(),
    $("#inputForm input[name=val3]").val(),
    $("#inputForm input[name=val4]").val()];
    var tempArray=[];
   
    if(CheckIfAnyElementEmpty(values)){
      
        for(var a = 0; a<4; a++){
            var tempArrayLefta = values.slice();
            var tempArray=[];
            tempArray[0] = tempArrayLefta.splice(a,1)[0];
            for(var b = 0; b<3; b++){
                var tempArrayLeftb = tempArrayLefta.slice();
                tempArray[1]=(tempArrayLeftb.splice(b,1)[0]);
                for(var c = 0; c<2; c++){
                    var tempArrayLeftc = tempArrayLeftb.slice();
                    tempArray[2]=(tempArrayLeftc.splice(c,1)[0]);
                    tempArray[3]=(tempArrayLeftc[0]);
                    TryAllMathOperatorsOrders(tempArray);
                }
            } 
        }

}
//console.log("Done");
WriteSolutions(solutions);
solutions = [];
$("#inputForm input[name=val1]").val("");
$("#inputForm input[name=val2]").val("");
$("#inputForm input[name=val3]").val("");
$("#inputForm input[name=val4]").val("") ;
}


function TryAllMathOperatorsOrders(array){
    var operands = ["+","-","*","/"];
    for(var a = 0; a<4; a++){
       var operandArray = [];
       operandArray[0] = operands[a];
        for(var b = 0; b<4; b++){
            operandArray[1] = operands[b];
            for(var c = 0; c<4; c++){
                operandArray[2] = operands[c];
                
                   // for(var e = 0; e<3; e++){
                           var evalString = array[0]+operandArray[0]+array[1]+operandArray[1]+array[2]+operandArray[2]+array[3];
                           CheckForSolution(evalString);
                            evalString ="("+array[0]+operandArray[0]+array[1]+")"+operandArray[1]+array[2]+operandArray[2]+array[3];

                            CheckForSolution(evalString);
                                evalString =array[0]+operandArray[0]+"("+array[1]+operandArray[1]+array[2]+")"+operandArray[2]+array[3];

                                CheckForSolution(evalString);
                                evalString ="("+array[0]+operandArray[0]+array[1]+operandArray[1]+array[2]+")"+operandArray[2]+array[3];

                                CheckForSolution(evalString);
                                evalString ="("+array[0]+operandArray[0]+array[1]+")"+operandArray[1]+"("+array[2]+operandArray[2]+array[3]+")";
                               
                                CheckForSolution(evalString);
                                evalString ="(("+array[0]+operandArray[0]+array[1]+")"+operandArray[1]+array[2]+")"+operandArray[2]+array[3];
                               
                                CheckForSolution(evalString);
                        }
                           // console.log("OMG")
                           
                        
                    
                
            }
        } 
    }

function CheckForSolution(string1){
    if(eval(string1)==24){
        solutions.push(string1);
    }
}

function CheckIfAnyElementEmpty(array){
   var emptyOne = false; 
    array.forEach(function(ele){
        if(ele == undefined||ele==null||ele==""){
           
            emptyOne=true;
        }
    });
    
    return !emptyOne;
}

function WriteSolutions(array){
    
    var area = $("#solutionsArea");
    var tempString = "";
    area.html("");
    for(var i = 1; i<=Math.ceil(array.length/4); i++){
        
        if(array.length<i*4-2){
            tempString = tempString + array[i*4-4];
        }else if(array.length<i*4-1){
            tempString = tempString + array[i*4-4] + "  |  " +  array[i*4-3];
        }else if(array.length<(i*4)){
        
            tempString = tempString + array[i*4-4] + "  |  " + array[i*4-3] + "  |  " + array[i*4-2];
        }else{
            tempString = tempString + array[i*4-4] + "  |  " + array[i*4-3] + "  |  " + array[i*4-2] +  "  |  " + array[i*4-1] +"<br><br>";
        }
    }
    if(tempString==""){
        tempString="None"
    }
    area.html(tempString);

}
