import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { Root, HTML, BlockContent, DefinitionContent, Code, Paragraph } from "mdast"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { Replace, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { slug as slugAnchor } from "github-slugger"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import path from "path"
import { JSResource } from "../../util/resources"
// @ts-ignore
import calloutScript from "../../components/scripts/callout.inline.ts"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"
import { capitalize } from "../../util/lang"

export interface Options {
  comments: boolean
  highlight: boolean
  wikilinks: boolean
  callouts: boolean
  mermaid: boolean
  parseTags: boolean
  parseBlockReferences: boolean
  enableInHtmlEmbed: boolean
}

const defaultOptions: Options = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  parseBlockReferences: true,
  enableInHtmlEmbed: false,
}

const icons = {
  infoIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  pencilIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>`,
  clipboardListIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>`,
  checkCircleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  flameIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  checkIcon: `<svg
  width="100%"
  height="100%"
  viewBox="0 0 143.62196 174.03577"
  version="1.1"
  id="svg5"
  xml:space="preserve"
  inkscape:version="1.2.2 (b0a84865, 2022-12-01)"
  sodipodi:docname="the-flower.svg"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview
    id="namedview7"
    pagecolor="#ffffff"
    bordercolor="#000000"
    borderopacity="0.25"
    inkscape:showpageshadow="2"
    inkscape:pageopacity="0.0"
    inkscape:pagecheckerboard="0"
    inkscape:deskcolor="#d1d1d1"
    inkscape:document-units="mm"
    showgrid="false"
    inkscape:zoom="0.2102413"
    inkscape:cx="-420.94488"
    inkscape:cy="397.16269"
    inkscape:window-width="1512"
    inkscape:window-height="945"
    inkscape:window-x="0"
    inkscape:window-y="37"
    inkscape:window-maximized="0"
    inkscape:current-layer="layer1" /><defs
    id="defs2" /><g
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    id="layer1"
    transform="translate(-38.934777,-57.482786)"><text
      xml:space="preserve"
      style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:173.329px;font-family:'Bodoni 72';-inkscape-font-specification:'Bodoni 72, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;text-align:center;text-anchor:middle;fill:#000000;fill-rule:evenodd;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;paint-order:markers fill stroke"
      x="90.610085"
      y="161.83894"
      id="text236"><tspan
        sodipodi:role="line"
        id="tspan234"
        style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:173.329px;font-family:'Bodoni 72';-inkscape-font-specification:'Bodoni 72, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-east-asian:normal;fill:#000000;stroke:none;stroke-width:1"
        x="90.610085"
        y="161.83894" /></text><path
      style="fill:currentColor;stroke-width:1"
      d="m 111.79615,230.87518 c -1.73261,-2.80341 -5.24032,-27.97464 -5.24032,-37.60438 0,-11.38258 -6.19785,-17.04378 -26.69069,-24.3795 -6.01068,-2.15164 -12.767369,-5.06851 -15.014861,-6.48198 -7.552141,-4.74962 -14.61787,-12.28768 -19.203309,-20.48697 -2.84962,-5.09545 -7.480464,-17.29478 -6.603455,-17.3959 2.998221,-0.34566 10.222579,0.47007 15.012375,1.6951 8.056788,2.06058 13.872317,5.35068 22.54746,12.75612 4.05878,3.46471 9.54975,7.36905 12.20214,8.67628 4.81177,2.37148 15.00713,4.48337 17.33376,3.59056 0.98118,-0.37653 1.20861,-2.08836 1.20861,-9.09672 v -8.6329 l -3.26126,-0.43744 c -4.93584,-0.66202 -12.86554,-4.9306 -18.01356,-9.69677 -7.57243,-7.01075 -11.99857,-17.22231 -11.98107,-27.641577 0.0248,-14.703938 8.08086,-27.851941 20.90905,-34.124437 10.74094,-5.251891 22.44259,-5.50547 32.91035,-0.713172 20.62414,9.442047 28.62467,34.127159 17.43645,53.799106 -4.65897,8.19172 -15.96182,16.72782 -24.19489,18.27237 l -2.71663,0.50965 v 8.62419 8.62419 l 4.15816,-0.009 c 8.68508,-0.0209 17.49836,-3.60169 27.12705,-11.02543 7.42083,-5.72151 18.18281,-11.19564 26.47789,-13.46816 3.23682,-0.88676 6.03077,-1.46663 6.2088,-1.28861 0.77313,0.77316 -1.63943,12.29647 -3.36461,16.07044 -4.18647,9.15841 -10.9382,14.69876 -23.97155,19.67064 -16.66136,6.35589 -25.87265,13.09442 -29.8792,21.85814 -4.24145,9.27752 -6.81742,22.56224 -7.99997,41.25726 l -0.48847,7.72228 h -2.25543 c -1.24049,0 -2.43426,-0.28917 -2.65282,-0.64298 z M 122.1141,114.67267 c 15.53785,-7.60197 15.52677,-30.089216 -0.0189,-38.213553 -5.79854,-3.030382 -14.19193,-3.030382 -19.99045,0 -9.5481,4.98996 -13.89482,16.282226 -10.24713,26.620893 4.28693,12.15047 18.21157,17.48564 30.25639,11.59266 z"
      id="path414" /></g></svg>`,
  helpCircleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  alertTriangleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  xIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  zapIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  bugIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>`,
  listIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  quoteIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>`,
}

const callouts = {
  note: icons.pencilIcon,
  abstract: icons.clipboardListIcon,
  info: icons.infoIcon,
  todo: icons.checkCircleIcon,
  tip: icons.flameIcon,
  success: icons.checkIcon,
  question: icons.helpCircleIcon,
  warning: icons.alertTriangleIcon,
  failure: icons.xIcon,
  danger: icons.zapIcon,
  bug: icons.bugIcon,
  example: icons.listIcon,
  quote: icons.quoteIcon,
}

const calloutMapping: Record<string, keyof typeof callouts> = {
  note: "note",
  abstract: "abstract",
  summary: "abstract",
  tldr: "abstract",
  info: "info",
  todo: "todo",
  tip: "tip",
  hint: "tip",
  important: "tip",
  success: "success",
  check: "success",
  done: "success",
  question: "question",
  help: "question",
  faq: "question",
  warning: "warning",
  attention: "warning",
  caution: "warning",
  failure: "failure",
  missing: "failure",
  fail: "failure",
  danger: "danger",
  error: "danger",
  bug: "bug",
  example: "example",
  quote: "quote",
  cite: "quote",
}

function canonicalizeCallout(calloutName: string): keyof typeof callouts {
  let callout = calloutName.toLowerCase() as keyof typeof calloutMapping
  return calloutMapping[callout] ?? "note"
}

// !?               -> optional embedding
// \[\[             -> open brace
// ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)
// (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
export const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#]+)?(#+[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/,
  "g",
)
const highlightRegex = new RegExp(/==([^=]+)==/, "g")
const commentRegex = new RegExp(/%%(.+)%%/, "g")
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = new RegExp(/^\[\!(\w+)\]([+-]?)/)
const calloutLineRegex = new RegExp(/^> *\[\!\w+\][+-]?.*$/, "gm")
// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters, hyphens and/or underscores
// (?:\/[-_\p{L}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(/(?:^| )#((?:[-_\p{L}\d])+(?:\/[-_\p{L}\d]+)*)/, "gu")
const blockReferenceRegex = new RegExp(/\^([A-Za-z0-9]+)$/, "g")

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  const findAndReplace = opts.enableInHtmlEmbed
    ? (tree: Root, regex: RegExp, replace?: Replace | null | undefined) => {
        if (replace) {
          visit(tree, "html", (node: HTML) => {
            if (typeof replace === "string") {
              node.value = node.value.replace(regex, replace)
            } else {
              node.value = node.value.replaceAll(regex, (substring: string, ...args) => {
                const replaceValue = replace(substring, ...args)
                if (typeof replaceValue === "string") {
                  return replaceValue
                } else if (Array.isArray(replaceValue)) {
                  return replaceValue.map(mdastToHtml).join("")
                } else if (typeof replaceValue === "object" && replaceValue !== null) {
                  return mdastToHtml(replaceValue)
                } else {
                  return substring
                }
              })
            }
          })
        }

        mdastFindReplace(tree, regex, replace)
      }
    : mdastFindReplace

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // pre-transform blockquotes
      if (opts.callouts) {
        src = src.toString()
        src = src.replaceAll(calloutLineRegex, (value) => {
          // force newline after title of callout
          return value + "\n> "
        })
      }

      // pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)
      if (opts.wikilinks) {
        src = src.toString()
        src = src.replaceAll(wikilinkRegex, (value, ...capture) => {
          const [rawFp, rawHeader, rawAlias] = capture
          const fp = rawFp ?? ""
          const anchor = rawHeader?.trim().replace(/^#+/, "")
          const blockRef = Boolean(anchor?.startsWith("^")) ? "^" : ""
          const displayAnchor = anchor ? `#${blockRef}${slugAnchor(anchor)}` : ""
          const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
          const embedDisplay = value.startsWith("!") ? "!" : ""
          return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
        })
      }

      return src
    },
    markdownPlugins() {
      const plugins: PluggableList = []
      if (opts.wikilinks) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, wikilinkRegex, (value: string, ...capture: string[]) => {
              let [rawFp, rawHeader, rawAlias] = capture
              const fp = rawFp?.trim() ?? ""
              const anchor = rawHeader?.trim() ?? ""
              const alias = rawAlias?.slice(1).trim()

              // embed cases
              if (value.startsWith("!")) {
                const ext: string = path.extname(fp).toLowerCase()
                const url = slugifyFilePath(fp as FilePath)
                if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"].includes(ext)) {
                  const dims = alias ?? ""
                  let [width, height] = dims.split("x", 2)
                  width ||= "auto"
                  height ||= "auto"
                  return {
                    type: "image",
                    url,
                    data: {
                      hProperties: {
                        width,
                        height,
                      },
                    },
                  }
                } else if ([".mp4", ".webm", ".ogv", ".mov", ".mkv"].includes(ext)) {
                  return {
                    type: "html",
                    value: `<video src="${url}" controls></video>`,
                  }
                } else if (
                  [".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)
                ) {
                  return {
                    type: "html",
                    value: `<audio src="${url}" controls></audio>`,
                  }
                } else if ([".pdf"].includes(ext)) {
                  return {
                    type: "html",
                    value: `<iframe src="${url}"></iframe>`,
                  }
                } else if (ext === "") {
                  const block = anchor
                  return {
                    type: "html",
                    data: { hProperties: { transclude: true } },
                    value: `<blockquote class="transclude" data-url="${url}" data-block="${block}"><a href="${
                      url + anchor
                    }" class="transclude-inner">Transclude of ${url}${block}</a></blockquote>`,
                  }
                }

                // otherwise, fall through to regular link
              }

              // internal link
              const url = fp + anchor
              return {
                type: "link",
                url,
                children: [
                  {
                    type: "text",
                    value: alias ?? fp,
                  },
                ],
              }
            })
          }
        })
      }

      if (opts.highlight) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, highlightRegex, (_value: string, ...capture: string[]) => {
              const [inner] = capture
              return {
                type: "html",
                value: `<span class="text-highlight">${inner}</span>`,
              }
            })
          }
        })
      }

      if (opts.comments) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, commentRegex, (_value: string, ..._capture: string[]) => {
              return {
                type: "text",
                value: "",
              }
            })
          }
        })
      }

      if (opts.callouts) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "blockquote", (node) => {
              if (node.children.length === 0) {
                return
              }

              // find first line
              const firstChild = node.children[0]
              if (firstChild.type !== "paragraph" || firstChild.children[0]?.type !== "text") {
                return
              }

              const text = firstChild.children[0].value
              const restChildren = firstChild.children.slice(1)
              const [firstLine, ...remainingLines] = text.split("\n")
              const remainingText = remainingLines.join("\n")

              const match = firstLine.match(calloutRegex)
              if (match && match.input) {
                const [calloutDirective, typeString, collapseChar] = match
                const calloutType = canonicalizeCallout(
                  typeString.toLowerCase() as keyof typeof calloutMapping,
                )
                const collapse = collapseChar === "+" || collapseChar === "-"
                const defaultState = collapseChar === "-" ? "collapsed" : "expanded"
                const titleContent =
                  match.input.slice(calloutDirective.length).trim() || capitalize(calloutType)
                const titleNode: Paragraph = {
                  type: "paragraph",
                  children: [{ type: "text", value: titleContent + " " }, ...restChildren],
                }
                const title = mdastToHtml(titleNode)

                const toggleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fold">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>`

                const titleHtml: HTML = {
                  type: "html",
                  value: `<div
                  class="callout-title"
                >
                  <div class="callout-icon">${callouts[calloutType]}</div>
                  <div class="callout-title-inner">${title}</div>
                  ${collapse ? toggleIcon : ""}
                </div>`,
                }

                const blockquoteContent: (BlockContent | DefinitionContent)[] = [titleHtml]
                if (remainingText.length > 0) {
                  blockquoteContent.push({
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        value: remainingText,
                      },
                    ],
                  })
                }

                // replace first line of blockquote with title and rest of the paragraph text
                node.children.splice(0, 1, ...blockquoteContent)

                // add properties to base blockquote
                node.data = {
                  hProperties: {
                    ...(node.data?.hProperties ?? {}),
                    className: `callout ${collapse ? "is-collapsible" : ""} ${
                      defaultState === "collapsed" ? "is-collapsed" : ""
                    }`,
                    "data-callout": calloutType,
                    "data-callout-fold": collapse,
                  },
                }
              }
            })
          }
        })
      }

      if (opts.mermaid) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "code", (node: Code) => {
              if (node.lang === "mermaid") {
                node.data = {
                  hProperties: {
                    className: ["mermaid"],
                  },
                }
              }
            })
          }
        })
      }

      if (opts.parseTags) {
        plugins.push(() => {
          return (tree: Root, file) => {
            const base = pathToRoot(file.data.slug!)
            findAndReplace(tree, tagRegex, (_value: string, tag: string) => {
              // Check if the tag only includes numbers
              if (/^\d+$/.test(tag)) {
                return false
              }
              tag = slugTag(tag)
              if (file.data.frontmatter && !file.data.frontmatter.tags.includes(tag)) {
                file.data.frontmatter.tags.push(tag)
              }

              return {
                type: "link",
                url: base + `/tags/${tag}`,
                data: {
                  hProperties: {
                    className: ["tag-link"],
                  },
                },
                children: [
                  {
                    type: "text",
                    value: `#${tag}`,
                  },
                ],
              }
            })
          }
        })
      }
      return plugins
    },
    htmlPlugins() {
      const plugins = [rehypeRaw]

      if (opts.parseBlockReferences) {
        plugins.push(() => {
          const inlineTagTypes = new Set(["p", "li"])
          const blockTagTypes = new Set(["blockquote"])
          return (tree, file) => {
            file.data.blocks = {}

            visit(tree, "element", (node, index, parent) => {
              if (blockTagTypes.has(node.tagName)) {
                const nextChild = parent?.children.at(index! + 2) as Element
                if (nextChild && nextChild.tagName === "p") {
                  const text = nextChild.children.at(0) as Literal
                  if (text && text.value && text.type === "text") {
                    const matches = text.value.match(blockReferenceRegex)
                    if (matches && matches.length >= 1) {
                      parent!.children.splice(index! + 2, 1)
                      const block = matches[0].slice(1)

                      if (!Object.keys(file.data.blocks!).includes(block)) {
                        node.properties = {
                          ...node.properties,
                          id: block,
                        }
                        file.data.blocks![block] = node
                      }
                    }
                  }
                }
              } else if (inlineTagTypes.has(node.tagName)) {
                const last = node.children.at(-1) as Literal
                if (last && last.value && typeof last.value === "string") {
                  const matches = last.value.match(blockReferenceRegex)
                  if (matches && matches.length >= 1) {
                    last.value = last.value.slice(0, -matches[0].length)
                    const block = matches[0].slice(1)

                    if (!Object.keys(file.data.blocks!).includes(block)) {
                      node.properties = {
                        ...node.properties,
                        id: block,
                      }
                      file.data.blocks![block] = node
                    }
                  }
                }
              }
            })

            file.data.htmlAst = tree
          }
        })
      }

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      if (opts.callouts) {
        js.push({
          script: calloutScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        })
      }

      if (opts.mermaid) {
        js.push({
          script: `
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';
          const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: darkMode ? 'dark' : 'default'
          });
          document.addEventListener('nav', async () => {
            await mermaid.run({
              querySelector: '.mermaid'
            })
          });
          `,
          loadTime: "afterDOMReady",
          moduleType: "module",
          contentType: "inline",
        })
      }

      return { js }
    },
  }
}

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>
    htmlAst: HtmlRoot
  }
}
