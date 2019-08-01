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
            return data.replace(reg, "![$1](../../markdown/knowledges$2)");
        }
    }
}
