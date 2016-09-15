$( document ).ready(function() {
	
	
	/* -----------------------------------------
	Loans Calculators
	----------------------------------------- */
	$('.calculator input[type="text"]').keyup(function(event) {
	
	  // skip for arrow keys
	  if(event.which >= 37 && event.which <= 40) return;
	
	  // format number
	  $(this).val(function(index, value) {
		return value
		.replace(/\D/g, "")
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		;
	  });
	});
	
	function PMT( rate, nper, pv ){
		/*  	rate	= interest rate for the loan
			nper	= total number of payments for the loan
			pv	= present value; principal
			fv	= future value
			type	=  when the payments are due:
					0: end of period
					1: beginning of period
		*/
		
		var paymentAmount = rate * ( pv * Math.pow((1 + rate), nper) ) / (1 - Math.pow((1 + rate), nper));
		
		return paymentAmount;  
	}
	
	$( '#mortgage .button' ).click(function() {
		
		var loanAmount 			= parseInt( $( 'input[name="loan-amount"]' ).val().replace(/,/g, '') );
		var interestRate	 	= parseInt( $( 'input[name="interest-rate"]' ).val().replace(/,/g, '') );
		var interestOnly		= parseInt( $( '#mortgage select[name="interest-only"]' ).val() );
		var loanTerm 			= parseInt( $( 'input[name="loan-term"]' ).val() );
		var results			= $( '.results' );
				
    		var payment 			= ( loanAmount * ( interestRate / 100 ) / 12 );
		var repayment			= PMT( (interestRate/100)/12, loanTerm*12, -loanAmount );
		
		if( isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) ){
			results.html( 'Please fill in all fields.' );	
		}else{
			
			var output = '<div class="row"><div class="col-md-12">';
			
			if( interestOnly == 1){
				output = output + '<label>Approximate payments for interest only mortgage would be </label><span class="payment">£' + Math.round(payment) + '</span>/month';
			}else if( interestOnly == 0 ){
				output = output + '<label>Approximate repayments for repayment mortgage would be</label><span class="payment">£' + Math.round(repayment) +  '</span>/month';
			}
			
			output = output + '</div></div>';
				results.html( output );
		}
    });

});
