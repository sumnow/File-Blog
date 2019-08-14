import colorList from "@/util";

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
            const changeKeyWord = (color, data) => {
                const regs = color.keyword.reduce((a, b) => {
                    return `${a}|${b}`;
                });
                const reg = new RegExp(`\\b(${regs})\\b`, "g");
                return data.replace(reg, `<font style="color: ${color.color}">$1</font>`);
            };
            markdata = markdata.replace(/<code>[\s\S]*?<\/code>/g, function (w) {
                colorList.forEach((e, i) => {
                    w = changeKeyWord(colorList[i], w);
                });
                return w;
            });
            const reg2 = /[^:|>](\/\/.+\n)/g;
            return markdata.replace(reg2, `<font style="color: #608b4e">$1</font>`);
        },
        handleDate(str) {
            const _arr = str.match(/(\d{4})(\d{2})(\d{2})/);
            _arr.push(new Date(`${_arr[1]}/${_arr[2]}/${_arr[3]}`).getDay());
            return _arr;
        },
        handleHrefList(content) {
            const _reg = /<h(\d) id="([\w-]+)">([\s\S]+?)<\/h\d>/g;
            const obj = {};
            const _arr = content.match(_reg).map((e, i) => {
                return {
                    order: i,
                    no: `${e.replace(_reg, "$1")}.`,

                    level: e.replace(_reg, "$1"),
                    href: e.replace(_reg, "#$2"),
                    name: e.replace(_reg, "$3"),
                    active: false
                };
            });
            const _list = new Object();
            _arr.forEach(e => {
                if (_list.hasOwnProperty(e.level)) {
                    _list[e.level]++;
                } else {
                    _list[e.level] = 1;
                }
                e.no += _list[e.level];
            });
            return _arr;
        }
    }
}
