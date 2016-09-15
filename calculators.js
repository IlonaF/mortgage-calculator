jQuery(function( $ ) {
	
	
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
	
	$( '#borrowings .button' ).click(function() {
		
		var mainIncome 			= parseInt( $( 'input[name="main-income"]' ).val().replace(/,/g, '') );
		var secondaryIncome 	= parseInt( $( 'input[name="secondary-income"]' ).val().replace(/,/g, '') );
		var minField 			= $( '.loan-min' );
		var maxField 			= $( '.loan-max' );
		
		if( isNaN(mainIncome) || isNaN(secondaryIncome) ){
			$( '.results' ).html( 'Please fill in all fields.' );	
		}else{
			
	        var minAmount = ( mainIncome + secondaryIncome ) * 3;
			var maxAmount = ( mainIncome + secondaryIncome ) * 4.25;
		
			var output	= '<div class="row">';
                output  = output + '<div class="col-md-6"><label>Minimum loan amount</label><span class="loan-min">£' + minAmount.toLocaleString() + '</span></div>';
                output  = output + '<div class="col-md-6"><label>Maximum loan amount</label><span class="loan-max">£' + maxAmount.toLocaleString() + '</span></div>';
				output	= output + '</div>';
			
			$( '.results' ).html( output );
		}
    });
	
	function PMT( rate, nper, pv, target ){
		/*  rate	= interest rate for the loan
			nper	= total number of payments for the loan
			pv	= present value; principal
			fv	= future value
			type	=  when the payments are due:
					0: end of period
					1: beginning of period
		*/
		
		if( target == null){
			var paymentAmount = rate * pv * Math.pow((1 + rate), nper) / (1 - Math.pow((1 + rate), nper));
		}else{
			var paymentAmount = rate * ( pv * Math.pow((1 + rate), nper) + target ) / (1 - Math.pow((1 + rate), nper));
		}		
		
		return paymentAmount;  
	}
	
	$( '#mortgage .button' ).click(function() {
		
		var loanAmount 			= parseInt( $( 'input[name="loan-amount"]' ).val().replace(/,/g, '') );
		var interestRate	 	= parseInt( $( 'input[name="interest-rate"]' ).val().replace(/,/g, '') );
		var interestOnly		= parseInt( $( '#mortgage select[name="interest-only"]' ).val() );
		var loanTerm 			= parseInt( $( 'input[name="loan-term"]' ).val() );
		var results		= $( '.results' );
				
        var payment 	= ( loanAmount * ( interestRate / 100 ) / 12 );
		var repayment	= PMT( (interestRate/100)/12, loanTerm*12, -loanAmount );
		
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
	
	$( '#savings .button' ).click(function() {
		
		var target	 			= parseInt( $( 'input[name="target"]' ).val().replace(/,/g, '') );
		var initialSavings	 	= parseInt( $( 'input[name="initial-savings"]' ).val().replace(/,/g, '') );
		var interestRate		= parseInt( $( 'input[name="interest-rate"]' ).val() );
		var savingTerm 			= parseInt( $( 'input[name="saving-term"]' ).val() );
		
		if( isNaN(target) || isNaN(initialSavings) || isNaN(interestRate) || isNaN(savingTerm) ){
			$( '.results' ).html( 'Please fill in all fields.' );	
		}else{
			var savings	= -PMT( interestRate/1200, savingTerm*12, initialSavings, target );
			
			$( '.results' ).html( '<label>Need to save </label><span class="saving">£' + (Math.round(savings)).toLocaleString() + '</span>/month' );
		}
    });

});