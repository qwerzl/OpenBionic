import jszip from 'jszip';
import { textVide } from "text-vide";
import { dirname } from "pathe";
import { saveAs } from 'file-saver';

const new_zip = new jszip();

export default async function epub(f: FileList, config: Config) {
  const zip = await new_zip.loadAsync(f[0]);
  const parser = new DOMParser();

  const metaRaw = await zip.file("META-INF/container.xml")!.async('string')
  const meta = parser.parseFromString(metaRaw, "application/xml");

  const contentPath = meta.getElementsByTagName("rootfile")[0].getAttribute("full-path")!
  const content = parser.parseFromString(await zip.file(
    contentPath
  )!.async('string'), "application/xml")

  for (const item of content.getElementsByTagName('item')) {
    const path = dirname(contentPath)+"/"+item.getAttribute('href')!
    if (path.endsWith('.html')) {
      const html = await zip.file(path)!.async('string')
      const processedHtml = textVide(html, { fixationPoint: config.fixation[0] })
      zip.file(path, processedHtml)
    }
  }

  saveAs(await zip.generateAsync({ type: "blob" }), f[0].name)

  return
}
