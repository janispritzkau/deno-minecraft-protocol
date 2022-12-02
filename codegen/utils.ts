export async function format(code: string) {
  const child = new Deno.Command("deno", {
    args: ["fmt", "--options-line-width", "120", "-"],
    stdin: "piped",
  }).spawn();
  const writer = child.stdin.getWriter();
  await writer.write(new TextEncoder().encode(code));
  await writer.close();
  const output = await child.output();
  if (!output.success) throw new Error(new TextDecoder().decode(output.stderr));
  return new TextDecoder().decode(output.stdout);
}

export function formatDocComment(description: string): string {
  if (!description.includes("\n")) return `/** ${description} */\n`;
  return "/**\n" + description.split("\n").map((line) => " * " + line).join("\n") + "\n */\n";
}
