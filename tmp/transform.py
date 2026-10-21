import re

with open('/tmp/pulsetrips.js', 'r', encoding='utf-8') as f:
    text = f.read()

print('Initial length:', len(text))

# 1. Remove the demo credentials and quick fill buttons from the portal login modal
# Replace the block for ops demo
pattern_ops = r'\(0,([A-Za-z0-9_]+)\.jsxs\)\(`div`,\{className:`flex items-center justify-between pt-1`,children:\[\(0,\1\.jsx\)\(`span`,\{className:`font-mono text-\[11px\] text-emerald-300`,children:`ops@pulsetrips\.com • ops2026!`\}\),\(0,\1\.jsxs\)\(`button`,\{type:`button`,onClick:[A-Za-z0-9_]+,[^}]*children:\[\(0,\1\.jsx\)\([A-Za-z0-9_]+,\{className:`w-3 h-3`\}\),\(0,\1\.jsx\)\(`span`,\{children:`Quick Fill`\}\)\]\}\)\]\}\)'
match_ops = re.search(pattern_ops, text)
print('Match ops pattern:', bool(match_ops))
if match_ops:
    text = text[:match_ops.start()] + 'null' + text[match_ops.end():]

# Replace the block for admin demo
pattern_admin = r'\(0,([A-Za-z0-9_]+)\.jsxs\)\(`div`,\{className:`flex items-center justify-between pt-1`,children:\[\(0,\1\.jsx\)\(`span`,\{className:`font-mono text-\[11px\] text-orange-300`,children:`admin@pulsetrips\.com • pulse2026!`\}\),\(0,\1\.jsxs\)\(`button`,\{type:`button`,onClick:[A-Za-z0-9_]+,[^}]*children:\[\(0,\1\.jsx\)\([A-Za-z0-9_]+,\{className:`w-3 h-3`\}\),\(0,\1\.jsx\)\(`span`,\{children:`Quick Fill`\}\)\]\}\)\]\}\)'
match_admin = re.search(pattern_admin, text)
print('Match admin pattern:', bool(match_admin))
if match_admin:
    text = text[:match_admin.start()] + 'null' + text[match_admin.end():]

# 2. Inside the Operations Manager portal, remove the box that leaks 'ops@pulsetrips.com' and 'Direct Portal Sign-in'
pattern_ops_box = r'children:\[\(0,([A-Za-z0-9_]+)\.jsx\)\(`span`,\{className:`text-\[10px\] font-bold text-slate-400 uppercase`,children:`Confidential Email`\}\),\(0,\1\.jsx\)\(`p`,\{className:`font-mono font-bold text-white text-sm`,children:`ops@pulsetrips\.com`\}\),\(0,\1\.jsx\)\(`span`,\{className:`text-\[10px\] text-emerald-400`,children:`Direct Portal Sign-in`\}\)\]'
match_ops_box = re.search(pattern_ops_box, text)
print('Match ops box pattern:', bool(match_ops_box))
if match_ops_box:
    replacement_box = r'children:[(0,\1.jsx)(`span`,{className:`text-[10px] font-bold text-slate-400 uppercase`,children:`Portal Authorization`}),(0,\1.jsx)(`p`,{className:`font-mono font-bold text-emerald-400 text-sm`,children:`Active Verified Session`}),(0,\1.jsx)(`span`,{className:`text-[10px] text-slate-400`,children:`Confidential Access`})]'
    text = text[:match_ops_box.start()] + re.sub(pattern_ops_box, replacement_box, match_ops_box.group(0)) + text[match_ops_box.end():]

# 3. For the Admin: When he signs in in his portal, he will have to see 'Owner' as the person who signed in
# In portalLogin:
text = text.replace(
    'fullName:`Pulse Trips Ltd (Administrator & Owner)`,role:`super_admin`,approvedByOwner:!0',
    'fullName:`Owner`,role:`owner`,roleTitle:`Owner`,approvedByOwner:!0'
)
text = text.replace(
    'fullName:`Pulse Trips Ltd (Owner)`',
    'fullName:`Owner`'
)

# In the Admin header:
text = text.replace(
    '`Administrator & Owner: `,(0,V.jsx)(`strong`,{className:`text-white`,children:`Pulse Trips Ltd`})',
    '`Signed in as: `,(0,V.jsx)(`strong`,{className:`text-white`,children:`Owner`})'
)

# 4. For the Operation Manager: When he signs in, he will have to see 'Operation Manager' as the person who signed in
# In portalLogin:
text = text.replace(
    'fullName:`Patrick Kwizera (Executive Operations Manager)`,email:`ops@pulsetrips.com`',
    'fullName:`Operation Manager`,email:`ops@pulsetrips.com`'
)
# In the Operation Manager profile card:
text = text.replace(
    'children:`Patrick Kwizera`',
    'children:`Operation Manager`'
)

# Make sure quick fill helper doesn't leak or throw
text = text.replace(
    "c(`admin@pulsetrips.com`),u(`pulse2026!`)",
    "c(``),u(``)"
)
text = text.replace(
    "c(`ops@pulsetrips.com`),u(`ops2026!`)",
    "c(``),u(``)"
)

# Write output to src/app.js
with open('src/app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Transformed JS written to src/app.js, size:', len(text))
