export async function format(code: string) {
  const cmd = new Deno.Command("deno", {
    args: ["fmt", "--options-line-width", "200", "-"],
    stdin: "piped",
  });
  cmd.spawn();
  const writer = cmd.stdin.getWriter();
  await writer.write(new TextEncoder().encode(code));
  await writer.close();
  const output = await cmd.output();
  if (!output.success) throw new Error(new TextDecoder().decode(output.stderr));
  return new TextDecoder().decode(output.stdout);
}