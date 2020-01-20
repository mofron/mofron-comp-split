/**
 * @file  mofron-comp-split/index.js
 * @brief split component for mofron
 *        this component splits screen to two.
 *        exp. one is for menu or navigate and the other is for main contents.
 * @feature default ratio is 20:80
 *          vertical split the screen into two
 *          the user can change the division ratio by dragging
 * @attention supported size is 'px' or 'rem'
 * @license MIT
 */
const Border  = require("mofron-effect-border");
const Grid    = require("mofron-layout-grid");
const Drag    = require("mofron-event-drag");
const evStyle = require("mofron-event-style");
const SyncWin = require("mofron-effect-syncwin");
const SyncHei = require("mofron-effect-synchei");
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) ratio parameter
     *                key-value: component option
     * @short ratio
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.name("Split");
            this.shortForm("ratio");
            /* init config */
            this.confmng().add("draggable", { type: "boolean", init: true });
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1);
	    }
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
            this.style({ "display": "flex" });
            
            /* border component */
	    this.border(
                comutl.getcmp({
		    style: { "transform": "translateX(-50%)" },
                    child: comutl.getcmp({
                               size: comutl.getarg("25px","100%"),
                               effect: new Border({ position: "right", color: [190,190,190] })
                           }),
                    size: comutl.getarg("50px","100%")
                })
            );
            let tgt = comutl.getcmp({ style: { "position": "absolute" } });
            this.child([this.border(), tgt]);
            this.childDom(tgt.childDom());
            this.styleDom(this.styleDom());
            
	    /* default config */
	    this.layout(new Grid({ tag: "Split" }));
            this.ratio(20,80);
	    this.draggable(true);
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
	    /* set size */
            this.border().effect(new SyncHei(this.childDom().component()));
            this.effect(
	        new SyncWin(
		    new mofron.class.ConfArg(
		        new mofron.class.ConfArg(
                            (null === this.width()) ? true : false,
		            (null === this.height()) ? true : false
			),
			undefined
		    )
		)
	    );
	    /* set default width from ratio */
	    this.border().style({ "left" : this.ratio()[0] + '%' });
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
	    if (undefined !== prm) {
	        prm.event(new Drag(this.dragEvent));
		prm.style({ "position" : "relative", "z-index": "100" });
	    }
	    return this.innerComp("border", prm, mofron.class.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * split ratio
     *
     * @param (number) left side split ratio [default is 20]
     * @param (number) right side split ratio [default is 80]
     * @return (array) split ratio [left, right]
     * @type parameter
     */
    ratio (p1, p2) {
        try {
	    let grid = this.layout({ name: "Grid", tag: "Split" });
	    if (undefined === p1) {
	        /* getter */
                return grid.ratio();
	    }
	    /* setter */
	    grid.ratio([p1,p2]);
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
        try {
            let ret = this.confmng("draggable", prm);
            if (undefined !== prm) {
                this.border().style({
                    "cursor": (true === prm) ? "col-resize" : "auto"
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * drag event function
     * 
     * @param (component) dragged component
     * @param (object) "mousemove" event object
     * @type private
     */
    dragEvent (p1,p2) {
        try {
            if (false === p1.parent().draggable()) {
                return;
            }
            let bdr  = p1.parent().border();
            bdr.style({ "left": p2.pageX + "px" });
            let grid = p1.parent().layout({ name: "Grid", tag: "Split" });
            let chd  = p1.parent().child();
            chd[0].width(p2.pageX + "px");
            chd[1].width(p1.parent().width().value() - p2.pageX + "px");
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
