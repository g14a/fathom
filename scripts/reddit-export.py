"""Export a Fathom signal as Reddit-flavoured markdown.

The text is verbatim: same order, same headings, same labels as
app/signals/[id]/page.tsx renders. Only math formulas are rewritten, because
Reddit cannot draw fractions. The post title is the signal title, so it is not
repeated in the body. "Follow the threads" links are read from the built page in
out/ when it exists (run `npm run build` first).

Usage: python3 scripts/reddit-export.py data/signals/<id>.json reddit/<id>.md
"""
import html
import json
import os
import re
import sys

SITE = "https://fathomjournal.in"
src, out = sys.argv[1], sys.argv[2]
slug = os.path.basename(src).replace(".json", "")
d = json.load(open(src))


def inline(t):
    # same syntax as inline() in the page: [label](url) and **bold**
    return re.sub(r"\]\((/[^)]*)\)", lambda m: "](" + SITE + m.group(1) + ")", t)


def frac(e, outer):
    n, dn = e["num"], e["den"]
    if e.get("numExp"):
        n += f"^({e['numExp']})"
    if e.get("denExp"):
        dn += f"^({e['denExp']})"
    wrap = lambda s: f"({s})" if re.search(r" [+−-] ", s) and not s.startswith("(") else s
    core = f"{wrap(n)} ÷ {wrap(dn)}"
    return f"({core})" if outer else core


def expr(parts, bold=True):
    outer = sum(e["kind"] == "frac" for e in parts) > 1 or any(
        e["kind"] == "op" and e["value"] in ("÷", "×") for e in parts)
    o = []
    for e in parts:
        k = e["kind"]
        if k == "frac":
            o.append(frac(e, outer))
        elif k == "pow":
            o.append(f"{e['value']}^({e['exp']})")
        elif k == "result":
            o.append(f"**{e['value']}**" if bold else e["value"])
        else:
            o.append(e["value"])
    return " ".join(o)


def table(cols, rows):
    esc = lambda s: inline(str(s)).replace("|", "/")
    lines = ["| " + " | ".join(esc(c) or " " for c in cols) + " |",
             "|" + "|".join(":--" for _ in cols) + "|"]
    lines += ["| " + " | ".join(esc(c) for c in r) + " |" for r in rows]
    return "\n".join(lines)


L = []
P = L.append

# Header: kicker, dateline, subtitle
P(f"Signal · {d.get('kindLabel') or d['kind']}" + (f"  \n{d['dateline']}" if d.get("dateline") else "") + "\n")
if d.get("seoDescription"):
    P(f"*{d['seoDescription']}*\n")

P("**What happened**\n")
for p in d["event"]:
    P(inline(p) + "\n")

if d.get("trigger"):
    P(f"**{d.get('triggerLabel') or 'The one equation'}**\n")
    P(f"**{d['trigger']}**\n")
    for p in d.get("triggerBody", []):
        P(inline(p) + "\n")

for s in d.get("sections", []):
    P(f"## {s['heading']}\n")
    for p in s.get("body", []):
        P(inline(p) + "\n")
    if s.get("table"):
        P(table(s["table"]["columns"], s["table"]["rows"]) + "\n")
    for m in s.get("math", []):
        if m.get("label"):
            P(f"**{m['label']}**\n")
        if m.get("lead"):
            P(inline(m["lead"]) + "\n")
        if m.get("exprCaption"):
            P(f"*{m['exprCaption']}*\n")
        P(f"> {expr(m['expr'])}\n")
        for ln in m.get("lines", []):
            if ln.get("caption"):
                P(f"*{ln['caption']}*\n")
            P(f"    {expr(ln['expr'], bold=False)}\n")
        if m.get("note"):
            P(inline(m["note"]) + "\n")
    img = s.get("image")
    if img and img.get("caption"):
        cap = img["caption"]
        url = SITE + img["src"]
        P((f"*[{cap}]({url})*" if "](" not in cap else f"*{inline(cap)}*") + "\n")
    if s.get("diagram") == "flow" and s.get("flow"):
        for i, f in enumerate(s["flow"], 1):
            P(f"{i}. {inline(f)}")
        P("")

if d.get("ignore") or d.get("focus"):
    P("## What to ignore, what to watch\n")
    if d.get("ignore"):
        P("**Ignore**\n")
        P("\n".join(f"* {x}" for x in d["ignore"]) + "\n")
    if d.get("focus"):
        P("**Watch**\n")
        P("\n".join(f"* {x}" for x in d["focus"]) + "\n")

if d.get("questions"):
    P(f"## {d.get('questionsTitle') or 'Questions worth asking'}\n")
    if d.get("questionsIntro"):
        P(inline(d["questionsIntro"]) + "\n")
    P("\n".join(f"* {q}" for q in d["questions"]) + "\n")

if d.get("historyRhymes"):
    P("## History rhymes\n")
    P(table(["This event", "Rhymes with", "Same mental model"],
            [[r["event"], r["similar"], r["model"]] for r in d["historyRhymes"]]) + "\n")

yt = d.get("yourTurn")
if yt:
    P("**Your turn**\n")
    P(yt["prompt"] + "\n")
    P("\n".join(f"{i}. {q}" for i, q in enumerate(yt.get("questions", []), 1)) + "\n")
    P("*Think it through first. Then check your reasoning.*\n")
    for r in yt.get("reveal", []):
        P(f">!{r}!<\n")

# Follow the threads, read from the built page so names and patterns match it
built = f"out/signals/{slug}/index.html"
if os.path.exists(built):
    t = open(built).read()
    i = t.find(">Follow the threads<")
    if i >= 0:
        seg = t[i:]
        seg = seg[:seg.find(">Sources<")] if ">Sources<" in seg else seg[:8000]
        lede = re.search(r'connections-lede[^>]*>([^<]*)<', seg)
        P("## Follow the threads\n")
        if lede:
            P(html.unescape(lede.group(1)) + "\n")
        items = []
        for m in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', seg, re.S):
            bits = [html.unescape(x).strip() for x in re.split(r"<[^>]+>", m.group(2))]
            bits = [b for b in bits if b and b != "→"]
            if len(bits) >= 2:
                href = m.group(1)
                href = href if href.startswith("http") else SITE + re.sub(r"^/fathom", "", href)
                items.append(f"* **{bits[0]}** [{' '.join(bits[1:])}]({href})")
        P("\n".join(items) + "\n")

if d.get("sources"):
    P("## Sources\n")
    P("\n".join(f"* [{x['label']}]({x['url']})" for x in d["sources"]) + "\n")

P(f"**{d.get('lessonLabel') or 'The lesson'}**\n")
P(d["lesson"] + "\n")

if d.get("remember"):
    P("**One sentence to remember**\n")
    P(d["remember"] + "\n")

P("---\n")
P("*Signals explain how to think about past and present events for learning. They are not "
  "predictions or advice, and past performance never guarantees future results.*\n")
# Site-wide footer disclaimer, verbatim from app/layout.tsx as rendered
if os.path.exists(built):
    m = re.search(r"<strong>Educational use only\.</strong>(.*?)<", open(built).read(), re.S)
    if m:
        P("**Educational use only.** " + re.sub(r"\s+", " ", html.unescape(m.group(1))).strip())

txt = re.sub(r"\n{3,}", "\n\n", "\n".join(L))
open(out, "w").write(txt)
print(f"{len(txt)} chars -> {out}  (Reddit limit 40000)")
