"""Example score: electronic, one part per scene role. A working start, not the house style: rewrite it for your film.
`reel.py music <slug>` runs <work>/score.py with the skill's music.py importable (music.md is the guide and the API).

  intro  heartbeat kick, a dark pad swelling in, the hook once on a bell
  build  four-on-the-floor arriving, hats thickening, the arp and the pad filter opening; a snare roll and a riser out
  drop   full kit, rolling bass, supersaw stabs, the lead hook; the climax gets half a beat of silence first and a sub hit
  break  pad-led, heartbeat kick, a soft bell hook
  outro  the groove thinning out bar by bar
  end    one final chord on the downbeat, then the reverb tail
"""

import sys
from pathlib import Path

import music as M
import numpy as np

work = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent
P = M.plan(work)
r = M.rng(P)
B, BAR, S16, N, BPB, SC, SR = P["beat"], P["bar"], P["s16"], P["N"], P["bpb"], P["scenes"], M.SR
tonic, mode, root_m, root_hz = P["tonic"], P["mode"], P["root_m"], P["root_hz"]
minor = M.SCALES[mode][2] == 3
PROG = {"main": "i VI III VII" if minor else "I V vi IV", "break": "VI VII i i" if minor else "IV V I I"}
HOOK = [(0, 7), (3, 6), (6, 4), (8, 4), (10, 6), (12, 7), (14, 9), (16, 7), (19, 6), (22, 4), (24, 2), (28, 0)]
ROLL = [0, B, 2 * B - 2 * S16, *(2 * B + i * S16 for i in range(4)), *(3 * B + i * S16 / 2 for i in range(4))]
START = {"intro": 0.6, "build": 0.9, "drop": 1.25, "break": 0.8, "outro": 0.9, "end": 1.4}  # scene-start hit strengths
kick, snare, hats, perc, bass, pad, stab, arp, lead, fx, low = (M.Bus(N) for _ in range(11))
kicks, hits, silences, pad_fc = [], [], [], np.full(N, 600.0)
LIFT = {"intro": (0, 0.1), "build": (0.15, 0.7), "drop": (1, 0), "break": (0.3, 0), "outro": (0.45, -0.35)}  # open + u*
K = lambda t, g=1.0: (kick.add(M.kick(root_hz, r), t, g * r.uniform(0.93, 1)), kicks.append(t))
SN = lambda t, g, pan=0.0: snare.add(M.snare(r), t + r.normal(0, 0.002), g * r.uniform(0.88, 1), pan)
HT = lambda t, g, o=False: hats.add(M.hat(r, o), t + r.normal(0, 0.003), g * r.uniform(0.8, 1), r.uniform(-0.2, 0.2))

for si, sc in enumerate(SC):
    role, t0, nb, top = sc["role"], sc["t0"], sc["bars"], sc["climax"]
    nxt = SC[si + 1] if si + 1 < len(SC) else None
    into_climax = bool(nxt and nxt["climax"])
    hits.append((t0, 1.5 if top else START[role], "drop" if top else "end" if role == "end" else "scene"))
    if role == "end":
        continue
    prog = M.progression(PROG["break" if role == "break" else "main"], tonic, mode)
    for k in range(nb):
        tb, u, last = t0 + k * BAR, (k + 0.5) / nb, k == nb - 1
        lv = LIFT[role][0] + LIFT[role][1] * u  # how open this bar is: the pad's filter, the bass and arp brightness
        root, q = prog[(k // 2 if role == "intro" else k) % len(prog)]
        ch, bm = M.voice(M.chord(root, q), 55, 69), M.bass_note(root, root_m + 12)
        groove = role in ("build", "drop", "outro")
        roll = last and role in ("build", "break") and nxt is not None and nxt["role"] in ("drop", "build", "outro")
        fill = groove and not roll and (k % 4 == 3 and not last or last and nxt is not None and nxt["role"] != "end")
        stop = tb + BAR - (B / 2 if roll and into_climax else 0)  # nothing new sounds after this in the bar
        if not groove:  # a muffled double kick: the pulse under intros and breaks
            for b in range(0, BPB, 2):
                for dt, gg in ((0, 0.5), (0.44 * B, 0.33)):
                    kick.add(M.band(M.kick(root_hz, r), hi=220), tb + b * B + dt, gg * (1 if role == "intro" else 0.8))
        else:
            for b in range(BPB):
                if tb + b * B < stop and not (role == "outro" and last and b):
                    K(tb + b * B, 1.0 if role == "drop" else 0.75 + 0.15 * u)
                if b % 2 and not (fill and b == BPB - 1) and not (role == "outro" and u > 0.6):
                    SN(tb + b * B, 0.8 if role == "drop" else 0.65)
            for s in range(4 * BPB):
                t = tb + s * S16
                if t >= stop - (B if fill or roll else 0) or (role == "outro" and u > 0.75):
                    continue
                if role == "drop":
                    HT(t, 0.28 if s % 4 == 2 else [0.3, 0.12, 0, 0.18][s % 4], s % 4 == 2)
                elif s % 2 if role == "build" and u >= 0.5 else s % 4 == 2:
                    HT(t, 0.14 + 0.14 * u)
            if fill:  # the last beat: a snare pickup and a tom run, answered by the film on the next downbeat
                SN(tb + BAR - B, 0.45)
                for i, st in enumerate([7, 3, -5], 1):
                    perc.add(M.tom(float(M.mtof(root_m + 24 + st)), r), tb + BAR - B + i * S16, 0.55, 0.5 - i / 3)
                hits.append((tb + BAR, 0.9, "fill"))
            if k % 4 == 0 and (role == "drop" or k > 0 or si > 0):
                fx.add(M.crash(r), tb, 0.3 if role == "drop" else 0.2, -0.2)
                if k > 0:
                    hits.append((tb, 0.8, "phrase"))
        if roll:  # an accelerating snare roll, a riser and a reverse cymbal into the next scene
            big = nxt["role"] == "drop"
            for i, dt in enumerate(ROLL):
                if tb + dt < stop:
                    SN(tb + dt, (0.18 + 0.045 * i) * (1 if big else 0.7), (i % 2 - 0.5) * 0.4)
            rs = tb + BAR - min(nb, 2 if big else 1) * BAR
            fx.add(M.riser(stop - rs, r, root_m=root_m + 24), rs, 0.5 if big else 0.3)
            fx.add(M.reverse_cymbal(r, 1.2), stop - 1.2, 0.35 if big else 0.2)
            if into_climax:  # the drop tease: half a beat of silence before the climax (reverb tails ring on)
                silences.append((stop, tb + BAR))
                hits.append((stop, 0.3, "tease"))
        if groove:  # bass between the kicks; the sidechain carves the rest
            steps = [s for s in range(4 * BPB) if s % 4] if role == "drop" or u > 0.5 else range(2, 4 * BPB, 4)
            for s in steps:
                if tb + s * S16 < stop - S16 and not (role == "outro" and (last or u > 0.8) and s > 3):
                    bn = M.bass(bm, S16 * 0.95, 0.6 + 0.4 * lv)
                    bass.add(bn, tb + s * S16, 0.5 if role == "drop" else 0.4)
            for b in range(BPB) if role == "drop" else ():
                bass.add(M.sub(bm - 12, B), tb + b * B + S16, 0.35)
        elif role == "break":
            bass.add(M.bass(bm, BAR, 0.2, 0.08, 1.2), tb, 0.25)
        p = M.supersaw(ch + ([ch[0] + 12] if role == "drop" else []), BAR + 0.03, r)
        p = M.fade(p, 0.015) * (np.linspace(0, 1, p.shape[1]) ** 1.5 if si == k == 0 else 1)  # bar 1 swells in
        pad.add(p, tb, 0.7 - 0.35 * u * (role == "outro"))
        pad_fc[int(tb * SR) : int((tb + BAR) * SR)] = 500 + 3700 * lv
        if role == "drop":  # supersaw stabs on the off-beat eighths
            st = M.stab([m + 12 for m in ch], 0.22, r, 4000)
            for s in (s for s in range(2, 4 * BPB, 4) if tb + s * S16 < stop):
                stab.add(st, tb + s * S16, 0.9 if top else 0.6)
                if k == 0:
                    hits.append((tb + s * S16, 0.7 if top else 0.55, "stab"))
        if role in ("build", "drop", "break") or (role == "outro" and u < 0.5):  # 16th FM arp through the chord
            tones = [m + 12 for m in ch] + [ch[0] + 24]
            for s in range(4 * BPB):
                if not ((s % 2 and (role == "break" or (role == "build" and u < 0.4))) or tb + s * S16 >= stop - B):
                    pl = M.pluck(tones[[0, 1, 2, 3, 2, 1, 2, 3][s % 8]], 0.5 + 0.8 * lv)
                    arp.add(pl, tb + s * S16, 0.16 * (1.15 if s % 4 == 0 else 0.85), np.sin(s) * 0.35)
        if (role == "drop" and k % 2 == 0) or (role in ("intro", "break") and k in (0, 2) and nb >= 2 and si + k > 0):
            for pos, dg in HOOK:  # the hook over two bars; strong positions snap onto the chord
                tt = tb + pos * S16
                if tt >= sc["t1"] - (B / 2 if into_climax else 0):
                    break
                cr, cq = prog[((k + pos // 16) // (2 if role == "intro" else 1)) % len(prog)]
                m, cp = M.degree(dg, tonic, mode, base=65), M.chord(cr, cq)
                m = M.nearest_tone(m, cp) if pos % 4 == 0 or any((m - c) % 12 in (1, 11) for c in cp) else m
                if role == "drop":
                    lead.add(M.lead(m, S16 * 3.8 + 0.05), tt, 0.14 * (1 if top else 0.7), -0.1)
                    lead.add(M.fm_bell(m + 12, 1.0, 0.5), tt, 0.05, 0.2)
                else:
                    lead.add(M.fm_bell(m, 1.4, 0.7), tt, 0.1 if role == "break" else 0.08, -0.15)
    if role == "drop":
        low.add(M.sub_impact(root_hz, r), t0, 0.8 if top else 0.5)
        fx.add(M.crash(r, 3.2), t0, 0.3 if top else 0.18, -0.3)

te, tail = P["end_t"], P["dur"] - P["end_t"]  # the end: a final chord stab, bells, a sub hit, then the reverb tail
endc = M.voice(M.chord(tonic, "madd9" if minor else "add9"), 57, 72)
stab.add(M.stab([*endc, endc[0] + 12, endc[0] - 12], 2.4, r, 5000, 0.45), te, 1.1)
for i, m in enumerate([endc[0] + 12, endc[1] + 12, endc[2] + 12, endc[0] + 24]):
    lead.add(M.fm_bell(m, 2.6, 0.6 + 0.1 * i), te + i * 0.06, 0.08, (i % 2 - 0.5) * 0.8)
K(te)
low.add(M.sub_impact(root_hz, r, 2.8), te, 0.9)
fx.add(M.crash(r, 3.2), te, 0.35)
bass.add(M.sub(root_m, 2.4, 0.005, 0.6), te, 0.4)
pad.add(M.pad(endc, tail, r, 1400, 0.3, tail - 0.3), te, 0.5)

duck, g = M.sidechain(kicks, N), M.gate(N, silences)
arpx = M.widen(M.band(arp.x, lo=260) * g * (0.6 + 0.4 * duck), 9)
leadx = M.band(lead.x, 300, 9000) * g
stems = {
    "drums": M.drum_bus(kick.x, snare.x, hats.x, perc.x, P["seed"]) * g,
    "bass": M.band(bass.x * duck, 55, 2600) * g,
    "low": M.band(low.x, hi=300),
    "pad": M.widen(M.band(M.filter_sweep(pad.x, pad_fc), lo=170) * g * (0.4 + 0.6 * duck)),
    "stab": M.band(stab.x, lo=220) * g * (0.6 + 0.4 * duck),
    "arp": arpx,
    "lead": leadx,
    "fx": M.band(fx.x, lo=150),
    "delay": M.pingpong(leadx, 6 * S16, 0.35, 6) * 0.5 + M.pingpong(arpx, 3 * S16, 0.28, 4) * 0.3,
}
gains = {"drums": 0.25, "bass": 1.25, "low": 0.45, "pad": 2.5, "stab": 5.0, "arp": 1.85, "lead": 2.5, "fx": 0.6}
sends = {"drums": 0.06, "pad": 0.3, "stab": 0.35, "arp": 0.3, "lead": 0.5, "fx": 0.4, "delay": 0.4}
M.write(work, M.mix(stems, gains, sends, P["seed"]), P, hits)
