class KN62A extends BaseInstrument {
    constructor() {
        super(...arguments);
        this.valueResolution = 1;
        this.valueResolutionDecimals = 0;
        this.navIndex = 1;
        this.mode = 0;
        this.on = 0;
    }
    get templateID() { return "KN62A"; }
    connectedCallback() {
        super.connectedCallback();
        this.mainframe = this.getChildById("Mainframe");
        this.electricity = this.getChildById("Electricity");
        this.distElement = this.getChildById("Dist");     
        this.distValue = this.getChildById("DistValue");           
        this.knotsElement = this.getChildById("Knots");
        this.knotsValue = this.getChildById("KTValue");
        this.minutesElement = this.getChildById("Minutes");
        this.minutesValue = this.getChildById("MinutesValue");
        this.freqElement = this.getChildById("Freq"); 
        this.freqValue = this.getChildById("FreqValue");
        this.rmtElement = this.getChildById("RMTLabel");        
    }

    Update() {
        super.Update();
        this.mode = this.getModeSwitch();
        this.on = this.getOnSwitch();
        this.setVisibility(this.rmtElement, true);
        this.showHide(this.knotsElement, true);            
        this.setVisibility(this.freqElement, false);
        this.setVisibility(this.minutesElement, true);            
        if( this.mode === 0 ) {
                this.navIndex = 1;
        } else if ( this.mode === 1 ) {
            this.navIndex = 2;
            this.setVisibility(this.rmtElement, false);
            this.showHide(this.knotsElement, false);            
            this.setVisibility(this.freqElement, true);  
            this.setVisibility(this.minutesElement, true);                          
        } else {
            this.navIndex = 2;
        }

        this.electricity.setAttribute('state', (this.on && this.isElectricityAvailable()) ? 'on' : 'off');

        diffAndSetText(this.distValue, this.toStr(this.getDistance(), "---"));
        diffAndSetText(this.knotsValue, this.toStr(this.getKnots(), "--"));  
        diffAndSetText(this.freqValue, this.toStr(this.getNavFreq(), "---")); 
        //diffAndSetText(this.minutesValue, this.toStr(this.getMinutes(), "---"));    
        diffAndSetText(this.minutesValue, this.getMinutes());             
    }

    setVisibility(elem, b) {
        if(! elem) return
        elem.style.visibility = (b) ? 'visible' : 'hidden';
    }

    showHide(elem, b) {
        if(! elem) return
        elem.style.display = (b) ? 'block' : 'none';
    }

    toStr(val, subst = '---') {
        return this.hasDME() ? val : subst;
    }

    hasDME() {
        return (SimVar.GetSimVarValue("NAV HAS DME:" + this.navIndex, "bool"));
    }

    getModeSwitch() {
        return SimVar.GetSimVarValue("L:DME_MODE", "number");
    }
    getOnSwitch() {
        return SimVar.GetSimVarValue("L:DME_CIRCUIT", "number");
    }    
    getNavFreq() {
        return fastToFixed(SimVar.GetSimVarValue("NAV ACTIVE FREQUENCY:" + this.navIndex, "MHz"), 2);
    }
    getDistance() {
        return  fastToFixed(SimVar.GetSimVarValue("NAV DME:" + this.navIndex, "nautical miles"), 1);
    }
    getKnots() {
        return fastToFixed(SimVar.GetSimVarValue("NAV DMESPEED:" + this.navIndex, "knots"), 0);
    }    
    getMinutes() {
        var miles = SimVar.GetSimVarValue("NAV DME:" + this.navIndex, "nautical miles");
        var knots = SimVar.GetSimVarValue("NAV DMESPEED:" + this.navIndex, "knots");
        return  (knots > 10) ? fastToFixed(miles / knots, 0) : 0; 
    }

}
registerInstrument("kn62a-element", KN62A);
//# sourceMappingURL=KN62A.js.map