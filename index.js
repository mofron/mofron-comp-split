/**
 * @file  mofron-comp-split/index.js
 * @brief split component for mofron
 * @feature vertical split the screen into two
 *          the user can change the division ratio by dragging
 * @attention supported size is 'px' or 'rem'
 * @author simpart
 */
const mf     = require("mofron");
const Border = require("mofron-effect-border");
const Grid   = require("mofron-layout-grid");
const Drag   = require("mofron-event-drag");

let drag_evt = (p1,p2) => {
    try {
        if (false === p1.parent().draggable()) {
            return;
        }
        let bdr  = p1.parent().border();
        bdr_wid  = mf.func.getSize(bdr.width());
        bdr.style({ "left": (p2.pageX - bdr_wid.value()/2) + "px" });
        
        let grid = p1.parent().layout(["Grid","Split"]);
        let wid  = mf.func.getSize(p1.parent().width());
        grid.setDirctSize([p2.pageX+"px", wid.value()-p2.pageX + "px"]);
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};

mf.comp.Split = class extends mf.Component {
    /**
     * initialize component
     * 
     * @param (object) object: component option
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name("Split");
            this.prmMap("ratio");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.style({
                "display":"flex",
                "position":"relative" 
            });
            
            this.border(
                new mf.Component({
                    child: new mf.Component({
                               size: ["20px", "100%"],
                               effect: new Border({ type: "right", color: [190,190,190] })
                           }),
                    size: ["40px", "100%"], event: new Drag(drag_evt) 
                })
            );
            
            let tgt = new mf.Component({ style: { "position" : "absolute" } });
            this.child([this.border(), tgt]);
            this.target(tgt.target());
            this.styleTgt(this.target());
            
            /* sync size */
            let wrap = this.adom().child()[0];
            this.target().styleListener("height", (p1) => { wrap.style(p1); });
            this.target().styleListener("width", (p1) => { wrap.style(p1); });
            
            this.layout(new Grid({ tag: "Split" }));
            this.ratio(20,80);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set border positon
     *
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            if (1 < this.child().length) {
                let wid     = mf.func.getSize(this.width());
                let bdr_wid = mf.func.getSize(this.border().width());
                this.border().style({
                    "position" : "relative",
                    "left": (((this.ratio()[0]/100)*wid.value()) - bdr_wid.value()/2) + "px",
                    "z-index": "100"
                })
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * split border component
     *
     * @param (component) border component
     * @return (component) border component
     * @type parameter
     */
    border (prm) {
        try {
            let ret = this.innerComp("border", prm, mf.Component);
            if (undefined !== prm) {
                prm.style({ "cursor":"col-resize" });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * split ratio
     *
     * @param (number) left side split ratio
     * @param (number) right side split ratio
     * @return (array) split ratio [left, right]
     * @type parameter
     */
    ratio (p1, p2) {
        try {
            if (undefined === p1) {
                return this.m_ratio;
            }
            if (100 < (p1+p2)) {
                throw new Error("invalid parameter: burst ratio");
            }
            this.m_ratio = [p1,p2];
            this.layout(["Grid","Split"]).ratio(this.ratio());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * draggable flag of split border
     *
     * @param (boolean) true: user is allowed change split ratio by dragging the border.
     *                  false: user can not change split ratio.
     * @return (boolean) draggable flag
     * @type parameter
     */
    draggable (prm) {
        try { return this.member("draggable", "boolean", prm, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Split;
/* end of file */
