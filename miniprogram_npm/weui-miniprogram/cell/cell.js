var globalThis = this,
    self = this;
module.exports = require("../_commons/0.js")([{
    ids: [3],
    modules: {
        5: function (e, t, a) {
            e.exports = a(71)
        },
        71: function (e, t) {
            Component({
                options: {
                    addGlobalClass: !0,
                    multipleSlots: !0
                },
                properties: {
                    hover: {
                        type: Boolean,
                        value: !1
                    },
                    link: {
                        type: Boolean,
                        value: !1
                    },
                    extClass: {
                        type: String,
                        value: ""
                    },
                    iconClass: {
                        type: String,
                        value: ""
                    },
                    bodyClass: {
                        type: String,
                        value: ""
                    },
                    icon: {
                        type: String,
                        value: ""
                    },
                    title: {
                        type: String,
                        value: ""
                    },
                    value: {
                        type: String,
                        value: ""
                    },
                    showError: {
                        type: Boolean,
                        value: !1
                    },
                    prop: {
                        type: String,
                        value: ""
                    },
                    url: {
                        type: String,
                        value: ""
                    },
                    footerClass: {
                        type: String,
                        value: ""
                    },
                    footer: {
                        type: String,
                        value: ""
                    },
                    inline: {
                        type: Boolean,
                        value: !0
                    },
                    hasHeader: {
                        type: Boolean,
                        value: !0
                    },
                    hasFooter: {
                        type: Boolean,
                        value: !0
                    },
                    hasBody: {
                        type: Boolean,
                        value: !0
                    },
                    extHoverClass: {
                        type: String,
                        value: ""
                    },
                    ariaRole: {
                        type: String,
                        value: ""
                    }
                },
                relations: {
                    "../form/form": {
                        type: "ancestor"
                    },
                    "../cells/cells": {
                        type: "ancestor"
                    }
                },
                data: {
                    inForm: !1
                },
                methods: {
                    setError: function (e) {
                        this.setData({
                            error: e || !1
                        })
                    },
                    setInForm: function () {
                        this.setData({
                            inForm: !0
                        })
                    },
                    setOuterClass: function (e) {
                        this.setData({
                            outerClass: e
                        })
                    },
                    navigateTo: function () {
                        var e = this,
                            t = this.data;
                        t.url && t.link && wx.navigateTo({
                            url: t.url,
                            success: function (t) {
                                e.triggerEvent("navigatesuccess", t, {})
                            },
                            fail: function (t) {
                                e.triggerEvent("navigateerror", t, {})
                            }
                        })
                    }
                }
            })
        }
    },
    entries: [
        [5, 0]
    ]
}]);