import colorList from "@/util/colorList/index";

export const commonMixin = {
    computed: {
        isComputer() {
            return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
                window.navigator.userAgent
            );
        }
    },
    methods: {
        parseFileName(e) {
            const reg = /^(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\S\s]+)\+([\S\s]+)/;
            const _arr = e.replace(/\.md/, "").match(reg);
            if (_arr) {
                return {
                    date: `${_arr[1]}-${_arr[2]}-${_arr[3]}` || "",
                    name: _arr[4].replace(/\-/g, " ") || "",
                    tags: _arr[5].split(",") || "",
                    input: _arr["input"] || ""
                }
            } else {
                console.warn(`parse ${e} error`);
                return {
                    date: "xxxx-xx-xx",
                    name: "ERROR",
                    tags: ["ERROR"],
                    input: "ERROR"
                };
            }
        },
        changeImgURL(data) {
            const reg = /!\[(\S+)\]\(\.\.(\/img\/\w+\.(png|jpg|bmp|gif|svg|webp))\)/g;
            return data.replace(reg, "![$1](../../markdown/knowledge$2)");
        },
        handleKeyword(markdata) {
            const preReg = /<pre class="lang-([a-z]+)"><code>([\s\S]+?)<\/code><\/pre>/g
            const preArr = markdata.match(preReg)
            // console.log(preArr)
            const changeKeyWord = (color, data) => {
                const regs = color.keyword.reduce((a, b) => {
                    return `${a}|${b}`;
                });
                const reg = new RegExp(`\\b(${regs})\\b`, "g");
                // console.log(reg, data.match(reg))
                return data.replace(reg, `<font style="color: ${color.color}">$1</font>`);
            };
            if (preArr && preArr.length) {
                preArr.forEach(e => {
                    const langType = e.replace(preReg, '$1')
                    const langContent = e.replace(preReg, '$2')
                    markdata = markdata.replace(langContent, function (w) {
                        // console.log(w)
                        if (colorList && colorList[langType]) {
                            colorList[langType].forEach((e, i) => {
                                w = changeKeyWord(e, w);
                            });
                        }
                        return w;
                    });
                })
            }

            markdata = this.changeAnnnotationReg(markdata)
            return markdata
        },
        handleDate(str) {
            const _arr = str.match(/(\d{4})(\d{2})(\d{2})/);
            _arr.push(new Date(`${_arr[1]}/${_arr[2]}/${_arr[3]}`).getDay());
            return _arr;
        },
        handleHrefList(content) {
            const _reg = /<h(\d) id="([\w-]+)">([\s\S]+?)<\/h\d>/g;
            let _arr = content.match(_reg).map((e, i) => {
                return {
                    order: i,
                    no: '',
                    level: parseInt(e.replace(_reg, "$1")),
                    href: e.replace(_reg, "#$2"),
                    name: e.replace(_reg, "$3"),
                    active: false
                };
            });
            const stack = [];
            for (let i = 0; i < _arr.length; i++) {
                if (i === 0) {
                    _arr[i].no = '1'
                    stack.push(_arr[i]);
                } else {
                    if (_arr[i].level == stack[stack.length - 1].level) {
                        // 最后一位加一
                        const _temp = stack[stack.length - 1].no.split('.')
                        const newVal = parseInt(_temp[_temp.length - 1]) + 1
                        _temp.pop()
                        _temp.push(newVal)
                        const a = _temp.join('.')
                        _arr[i].no = a
                        stack.push(_arr[i])
                    }
                    if (_arr[i].level > stack[stack.length - 1].level) {
                        // 再添加一位,从1开始
                        _arr[i].no = stack[stack.length - 1].no + '.1'
                        stack.push(_arr[i])
                    }
                    if (_arr[i].level < stack[stack.length - 1].level) {
                        // 推出栈
                        stack.pop();
                        i--;
                        continue;
                    }
                }
            }
            return _arr;
        },
        changeAnnnotationReg(mark) {
            const reg = /(\/\*(\s|.)*?\*\/)/g;
            const reg2 = /(\/\/[^\n]*)/g;
            mark = mark.replace(reg, `<font style="color: #5c6370">$1</font>`);
            return mark.replace(reg2, `<font style="color: #5c6370">$1</font>`);
        }
    }
}
