# Music: composing the score

You compose the film's music. Write `<work>/score.py`: it imports `music.py` (this directory) as a library of instruments, effects and mixing tools, composes a track for this film's `beats.json`, and ends with `M.write(...)`. Then run `python3 reel.py music <slug>`. If there is no `score.py` yet, that command copies `template/score.py`, a working electronic example, and runs it. Treat the example as one possible answer, not the house style: choose the genre, the meter, the instruments and the arrangement from the story. Choose the key and genre from the brand and the direction, never by default: two films in a row both landing in D minor electronica is a sign you didn't choose. A warm consumer brand might want a major key or lydian, a technical story dorian or a sparse piano, a playful launch a swung groove.

## The shape of a score

```python
import sys
from pathlib import Path

import music as M
import numpy as np

work = Path(sys.argv[1])
P = M.plan(work)              # beats.json -> scenes on bar lines, tempo, meter, key
r = M.rng(P)                  # the only randomness: seeded from the title, so rebuilds are identical
piano, pad = M.Bus(P["N"]), M.Bus(P["N"])
hits = []
for sc in P["scenes"]:
    hits.append((sc["t0"], 1.5 if sc["climax"] else 0.9, "scene"))
    for k in range(sc["bars"]):
        tb = sc["t0"] + k * P["bar"]
        ...                   # place notes and drums with bus.add(sound, time, gain, pan)
x = M.mix({"piano": piano.x, "pad": pad.x}, {"piano": 1.0, "pad": 0.6}, {"piano": 0.3, "pad": 0.5}, P["seed"])
M.write(work, x, P, hits)     # masters to -14 LUFS / -1 dBTP, writes music.mp3 + music.json
```

`reel.py music` checks that the scenes in `music.json` still match `beats.json`, so build `P` with `M.plan(work)` and pass it to `M.write` unchanged.

## Library

Times are seconds, notes are MIDI numbers, sounds are numpy arrays (mono `(n,)` or stereo `(2, n)`) at `M.SR`. `r` is the generator from `M.rng(P)`.

| Group | Name | What it does |
|---|---|---|
| Timing | `plan(work)` | `P`: `bpm`, `beat`, `bpb` (beats per bar), `bar`, `s16`, `scenes` `[{i, name, bars, role, climax, t0, t1}]`, `end_t`, `dur`, `N`, `tonic`, `mode`, `scale`, `root_m`, `root_hz`, `seed`. Exactly one scene has `climax`. |
| | `rng(P, salt=0)` | the seeded generator |
| | `step(P, tb, s, swing=0)` | time of sixteenth `s` in the bar at `tb`; `swing` 0–0.33 delays the off sixteenths |
| Theory | `parse_key(s)` | `"Bb dorian"` → `(10, "dorian")` |
| | `SCALES` | major, minor, dorian, phrygian, lydian, mixolydian, harmonic, pent_major, pent_minor, blues |
| | `chord(root_pc, q)` | pitch classes; `q` in `QUALITY`: M, m, dim, aug, sus2, sus4, 6, m6, 7, M7, m7, 9, M9, m9, add9, madd9 |
| | `roman(n, tonic, mode)`, `progression("i VI III VII", tonic, mode)` | Roman numerals in the key's own scale; lower case minor, `7` adds the seventh, `b`/`#` shift the root |
| | `voice(pcs, lo, hi)`, `nearest_tone(m, pcs)`, `degree(d, tonic, mode, base)`, `bass_note(pc, near)`, `mtof(m)` | voicing, snapping a melody onto the chord, scale degrees, a bass note near a register, MIDI to Hz |
| Drums | `kick(root_hz, r)` | the approved punchy kick: pitch drop onto the root, a sub tuned to it, a long body, a click |
| | `snare(r)`, `clap(r)`, `hat(r, open_)`, `shaker(r)`, `tom(hz, r)`, `crash(r, dur)` | each strike varies slightly; `crash` is stereo |
| Voices | `bass(m, dur, bright, att, dec)`, `sub(m, dur)` | filtered saw bass (short `dec` rolls, long `dec` holds), sine sub |
| | `piano(m, dur, vel)`, `epiano(m, dur, vel)` | additive piano with stretched partials; FM electric piano |
| | `pad(notes, dur, r, bright, att, rel)`, `supersaw(notes, dur, r)`, `stab(notes, dur, r, bright, dec)` | held chords, raw detuned saws, chord hits (all stereo) |
| | `pluck(m, bright, dur)`, `fm_bell(m, dur, bright, ratio)`, `lead(m, dur, bright)` | arps, bells, a saw lead |
| FX | `riser(dur, r, f0, f1, pitch, root_m)`, `reverse_cymbal(r, dur)`, `sub_impact(root_hz, r, dur)` | place a riser or reverse cymbal to end on the downbeat it leads into |
| Mix | `Bus(N).add(sound, t, g, pan)` | a stereo track; `.x` is its array |
| | `drum_bus(kick, snare, hats, perc, seed)` | room, parallel compression and low shelf: the approved drum sound |
| | `sidechain(times, N)`, `gate(N, spans)`, `filter_sweep(x, fc)`, `band(x, lo, hi)`, `fade(x, sec)`, `env(n, att, dec)` | duck envelope, silences, a moving low-pass, EQ, click-free edges, a simple envelope |
| | `reverb(send, seed, dur)`, `pingpong(x, dly, fb, taps)`, `widen(x, ms)`, `mono_low(x, fc)` | hall, echoes, width, a mono low end |
| | `mix(stems, gains, sends, seed, verb)` | sums the stems, adds one shared reverb from the sends, keeps the low end mono, fades the tail, and prints `stem_report` |
| | `stem_report(stems, gains)` | per stem: loudness, dB against the dry mix, and its share of the sub (< 60 Hz), low (60–250), mid (250–4k) and high (> 4k) bands. `mix` prints it; see Balancing |
| Output | `write(work, x, P, hits)` | masters (glue, saturation, true-peak limiter) to −14 LUFS and ≤ −1 dBTP, measured on the mp3 that ships, and writes `music.mp3` and `music.json` |

## Suggestions

These come from the reviews behind this skill. Break them when the film asks for it.

- **Arrange by scene role.** `beats.json` gives every scene a role, and the roles are the arrangement: an intro that is sparse and filtered, a build that adds layers bar by bar and ends in a roll or riser, a drop with everything in, a break led by a pad or piano, an outro that thins out, an end that is one final chord and a tail. In a slow piece a "drop" can be the moment the full chord and the strings arrive rather than a kick drum.
- **Put the drop on the climax.** The climax scene's downbeat is the film's biggest reveal, so it gets the biggest musical moment. Half a beat of silence before it (`gate(N, [(t0 - beat / 2, t0)])` on everything but the effects) makes it land far harder. Write it as a hit at the climax `t0` with strength 1.5.
- **Drums sound dry without space.** The first procedural drums had reverb sends of 0.08–0.10, the same one-shot on every hit, and metallic comb reverbs. `drum_bus` fixes that with a small convolution room, parallel compression and a low shelf, and every drum call varies a little. The user approved this kit in an A/B test; its kick tail is about 10 dB fuller. Keep it unless the genre wants something else, and tune `kick` to the root (`P["root_hz"]`).
- **Keep the low end mono and uncluttered.** `mix` puts everything below 120 Hz in the centre. Duck the bass, pads and stabs under the kick with `sidechain`, and give the bass and sub one register between them.
- **Loudness.** `write` masters to −14 LUFS integrated and at most −1 dBTP on the mp3 that ships, with our own BS.1770-4 meter (within 0.1 LU of ffmpeg). Balance the stems by ear and by level; the master only glues and limits.
- **The hits are a promise.** Every hit you write to `music.json` is something the film must answer: `check` flags any hit of strength 0.8 or more with no visual event within 40 ms. Write hits for scene starts, the drop, fills and phrase downbeats, and the end chord, and keep them on the sixteenth grid (`write` warns otherwise). Leave out what the picture should not chase.
- **Stay on the grid.** Scenes start on bar lines at any meter. For 3/4 or 6/8 set `"meter"` in `beats.json`, loop `for b in range(P["bpb"])`, and the film reads `MUSIC.bar`.
- **Determinism.** Draw every random choice from `M.rng(P)`, never from `np.random` directly, so the same beat map always gives the same file.

## Balancing without ears

You can't hear the track, so balance it by numbers. `mix` prints a table like this every time `reel.py music` runs, one row per stem, named after the keys of your `stems` dict:

```
stems: loudness vs the dry mix (-6.5 LUFS) and share of each band
  stem         LUFS  vs mix    sub    low    mid   high
  drums       -11.1    -4.6    93%    45%     3%    36%
  bass        -12.8    -6.3     5%    48%    13%     0%
  lead        -12.3    -5.8     0%     0%    36%    10%
  pad         -15.8    -9.3     0%     3%    18%     3%
```

Typical relationships in a track that sits well under a film:
- **The kick and the bass own the low end.** Between them they hold most of sub and low (drums mostly sub, bass mostly low). A pad, stab or lead with more than about 10 % of low is mud: `band(x, lo=...)` it.
- **One thing leads the mids.** The lead or hook is the loudest melodic stem, around 4–7 dB under the mix; the pad sits 3–6 dB under the lead, filling, not competing.
- **The hats don't own the top.** Drums with more than about half of high usually means harsh hats; the crashes and risers in `fx` may own it briefly, and that's fine.
- **Nothing is inaudible by accident.** A stem more than about 25 dB under the mix is doing nothing (echo returns excepted): raise it or cut it.
- **Nothing drowns the rest.** One stem within about 2 dB of the whole mix is the mix: turn it down.

Change `gains`, never the master, re-run `reel.py music`, and read the table again. Then check that `music.json`'s loudness and true peak pass.
